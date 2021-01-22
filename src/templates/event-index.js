import React from 'react'
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Speaker from '../components/speaker'

const EventIndex = ({data}) => {
  const events = data.allAirtable.nodes.map(n => n.data)
  const pageCount = data.allAirtable.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH Events" />
      <div className="page-news">
        <section className="news">
          <h1>
            Events &nbsp;
            <a href="/events/feed.xml">
              <FontAwesomeIcon title="Event RSS Feed" icon="rss" />
            </a>
          </h1>
          {events.map(event => {
            const speakers = event.speakers || []
            return (
              <article className="post" key={event.slug}>
                <h2 className="post-title">
                  <FontAwesomeIcon icon="calendar" /> &nbsp; 
                  <Link to={`/events/${event.slug}/`}>{event.talk_title || event.event_title}</Link>
                </h2>
                <ul className="inline-list">
                  {speakers.map(s => (
                    <li><Speaker person={s.data} /></li>
                  ))}
                </ul>
                <div className="post-meta">
                  <span className="pill">{event.type}</span> &nbsp;
                  <EventTime start={event.start} end={event.end} />
                </div>
                <div className="post-excerpt">{event.description ? event.description.childMarkdownRemark.excerpt : ''}</div>
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
    allAirtable (
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
          event_title
          talk_title
          type: event_type
          speakers {
            data {
              name
              website
            }
          }
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
