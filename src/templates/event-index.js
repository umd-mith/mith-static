import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'

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
              <article className="post" key={event.id}>
                <h2 className="post-title">
                  <Link to={`/events/${event.id}/`}>{event.title}</Link>
                </h2>
                <div className="post-meta">
                  {event.start} - {event.end} {event.type}
                </div>
                <div className="post-excerpt">
                  {event.description} 
                </div>
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
          id: ID
          title: event_title
          type: event_type
          description
          start: start_date(formatString: "MMMM D, YYYY HH:MM:SS")
          end: end_date(formatString: "MMMM D, YYYY")
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
