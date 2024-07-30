import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Layout from "../components/layout"
import Paginator from "../components/paginator"
import SEO from "../components/seo"
import EventTime from "../components/event-time"
import Person, { PersonComponentProps } from "../components/person"

import "./event-index.css"

interface EventIndexProps {
  data: Queries.EventsQuery
}

const EventIndex = ({ data }: EventIndexProps) => {
  const items = data.allAirtableEvents.nodes
  const pageCount = data.allAirtableEvents.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH Events" />
      <div className="page-events">
        <section className="posts events">
          <h1 className="page-title">Events</h1>
          {items.map(_item => {
            const item = _item.data!
            const slug = "/events/" + item.id + "/"

            const event_title = item.event_title
            const talk_title = item.talk_title
            const title_text = talk_title ? talk_title : event_title
            const title = item.talk_subtitle ? (
              <h2 className="title">
                <Link to={slug}>
                  {title_text}
                  <span className="subtitle">{item.talk_subtitle}</span>
                </Link>
              </h2>
            ) : (
              <h2 className="title">
                <Link to={slug}>{title_text}</Link>
              </h2>
            )

            let image: JSX.Element | undefined
            let excerpt: JSX.Element | undefined
            if (item.image) {
              image = (
                <Link to={slug} className="image">
                  <GatsbyImage
                    image={
                      item.image.localFiles?.[0]?.childImageSharp
                        ?.gatsbyImageData!
                    }
                    alt={item.event_title || ""}
                    className="event-image"
                  />
                </Link>
              )
            }
            if (item.description) {
              excerpt = (
                <div className="excerpt">
                  {item.description.childMarkdownRemark?.excerpt}
                </div>
              )
            }

            let speakers_list = null
            let speakers: JSX.Element | undefined
            const speakers_data = item.speakers ? item.speakers : []
            if (item.speakers) {
              speakers_list = speakers_data.map((p, i) => {
                return (
                  <Person
                    key={`p${i}`}
                    person={p?.data as unknown as PersonComponentProps}
                    type="index"
                  />
                )
              })
              speakers = (
                <div className="speakers hidden">
                  <ul className="inline-list">{speakers_list}</ul>
                </div>
              )
            }
            const status =
              item.status === "canceled" ? (
                <span className={`pill event-status ${item.status}`}>
                  {item.status}
                </span>
              ) : (
                ""
              )
            let types = null
            let types_list = null
            if (item.type) {
              types_list = item.type.map(t => {
                return (
                  <span className="pill event-type" key={`t${t}`}>
                    {t}
                  </span>
                )
              })

              types = (
                <div className="event-types">
                  {types_list}
                  {status}
                </div>
              )
            }

            const itemId = item.id?.replace(/-/g, "_")
            const iconLocation = <FontAwesomeIcon icon="map-marker-alt" />
            const location = item.location ? (
              <span className="location">
                {iconLocation} {item.location}
              </span>
            ) : (
              ""
            )
            const details = (
              <Link className="button" to={slug}>
                Event Details
              </Link>
            )

            return (
              <article
                className="event-item"
                key={`event-${item.id}`}
                id={itemId}
              >
                {image}
                <div className="content">
                  {title}
                  {types}
                  {excerpt}
                </div>
                <div className="meta">
                  <EventTime
                    start={parseInt(item.start!)}
                    end={parseInt(item.end!)}
                    icon="yes"
                  />
                  {location}
                </div>
                <div className="details">{details}</div>
              </article>
            )
          })}
        </section>
        <Paginator count={pageCount} path="events" />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Events($skip: Int!, $limit: Int!) {
    allAirtableEvents(
      limit: $limit
      skip: $skip
      filter: { data: { event_type: { ne: "Digital Dialogue" } } }
      sort: { data: { start_date: DESC } }
    ) {
      nodes {
        data {
          id
          event_title
          talk_title
          talk_subtitle
          type: event_type
          start: start_date
          end: end_date
          location
          status
          speakers {
            data {
              name
              slug
              new_id
              linked_identities {
                data {
                  title
                  department
                  institution
                  person_group
                }
              }
            }
          }
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(
                  width: 500
                  quality: 100
                  backgroundColor: "rgba(255,255,255,0)"
                )
              }
            }
          }
          description {
            childMarkdownRemark {
              excerpt(pruneLength: 250)
            }
          }
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`

export default EventIndex
