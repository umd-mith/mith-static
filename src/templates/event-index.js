import React from 'react'
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'
import EventTime from '../components/event-time'

import './post-index.css'

const EventIndex = ({data}) => {
  const events = data.allAirtable.nodes.map(n => n.data)
  const pageCount = data.allAirtable.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH Events" />
      <div className="page-news">
        <section className="news">
          <h1>Events</h1>
          {events.map(event => {
            return (
              <article className="post" key={event.slug}>
                <h2 className="post-title">
                  <FontAwesomeIcon icon="calendar" /> &nbsp; 
                  <Link to={`/events/${event.slug}/`}>{event.title}</Link>
                </h2>
                <div className="post-meta">
                  <EventTime start={event.start} end={event.end} />
                </div>
                <div className="post-excerpt">{event.description.childMarkdownRemark.excerpt}</div>
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
  query EventsQuery($skip: Int!, $limit: Int!) {
    allAirtable(
      filter: {
        table: {eq: "Events"}
      }
      limit: $limit
      skip: $skip
      sort: {fields: [data___start_date], order: [DESC]}
    ) {
      nodes {
        data {
          slug
          title: event_title
          type: event_type
          description {
            childMarkdownRemark {
              excerpt(pruneLength: 250)
            }
          }
          start: start_date
          end: end_date
          location
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
 
export default EventIndex
