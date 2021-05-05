import React from 'react'
import { graphql, Link } from 'gatsby';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './event-index.css'

const EventIndex = ({data}) => {
  const items = data.allEventsJson.nodes
  const pageCount = data.allEventsJson.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH Events" />
      <div className="page-events">
        <section className="posts events">
          <h1 className="page-title">Events</h1>
          {items.map(item => {

            const slug = '/events/' + item.id + '/'
            
            const event_title = item.event_title
            const talk_title = item.talk_title
            const title_text = talk_title ? talk_title : event_title
            const title = item.talk_subtitle
              ? <h2 className="title"><Link to={slug}>{title_text}<span className="subtitle">{item.talk_subtitle}</span></Link></h2> 
              : <h2 className="title"><Link to={slug}>{title_text}</Link></h2>
          
            let speakers_list = null
            let speakers = null
            const speakers_data = item.speakers ? item.speakers : []
            if (item.speakers) {
              speakers_list = speakers_data.map((p, i) => {
                return <Person key={`p${i}`} person={p} showTitle="false" type="index" />
              })
              speakers = <ul className="inline-list">
                {speakers_list}
              </ul>
            }

            let types = null
            let types_list = null 
            if (item.type) {
              types_list = item.type.map(t => {
                return <span className="pill event-type" key={`t${t}`}>{t}</span>
              })
              types = <span className="event-types">{types_list}</span>
            }

            const itemId = item.id.replace(/-/g, '_')

            return (
              <article className="post event-item-post" key={`event-${item.id}`} id={itemId}>
                {title}
                <div className="meta">
                  {types}
                  {speakers}
                  <EventTime start={item.start} end={item.end} />
                </div>
                <div className="post-excerpt">
                  
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
    allEventsJson (
      limit: $limit
      skip: $skip
      sort: {
        fields: [start_date], 
        order: [DESC]
      }
    ) {
      nodes {
        id
        event_title
        talk_title
        talk_subtitle
        type: event_type
        start: start_date
        end: end_date
        location
        speakers {
          name
          title
          department
          institution
          person_group
          slug
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
 
export default EventIndex
