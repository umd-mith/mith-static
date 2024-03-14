import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './event-index.css'

const Entry = ({item, headshots}) => {
  const slug = '/digital-dialogues/' + item.airtable_id + '/'
            
  const event_title = item.event_title
  const talk_title = item.talk_title
  const title_text = talk_title ? talk_title : event_title
  const title = item.talk_subtitle
  ? <h2 className="title">
      <Link to={slug}>{title_text}<span className="subtitle">{item.talk_subtitle}</span></Link>
    </h2>
  : <h2 className="title">
      <Link to={slug}>{title_text}</Link>
    </h2>

  const location = item.location ? <div className="location">{item.location}</div> : ''

  let speakers_list = null
  let speakers = null
  const speakers_data = item.speakers ? item.speakers : []
  if (item.speakers.length > 0) {
    speakers_list = speakers_data.map((p, i) => {
      // find headshot                
      p.headshot = headshots[p.slug]
      return <Person key={`p${i}`} person={p} type="dialogue-index" />
    })
    speakers = <div className="speakers">{speakers_list}</div>
  }

  return (
    <article className="post dialogue event" id={item.airtable_id.toLowerCase().replace(/-/g, '_')} key={`dialogue-${item.airtable_id}`}>
      {title}
      <div className="meta">
        {speakers}
        {location}
        <EventTime start={item.start} />
      </div>
    </article>
  )

}


const DialogueIndex = ({data, pageContext}) => {
  const items = data.allEventsJson.nodes
  const pageCount = data.allEventsJson.pageInfo.pageCount
  const headshots = pageContext.headshots

  // Arrange items in the future into reverse order.
  const sortedItems = items.reduce((acc, item) => {
    const date = new Date(item.start)
    if (date > new Date()) {
      acc.future.unshift(item)
    } else {
      acc.past.push(item)
    }
    return acc
  }, {future:[], past: []})

  return (
    <Layout>
      <SEO title="MITH Digital Dialogues" />
      <div className="page-dialogues">
        <section className="posts dialogues events">
          <h1 className="page-title">Digital Dialogues</h1>
          {sortedItems.future.map(item => <Entry item={item} headshots={headshots} key={item.airtable_id} />)}
          <h2 className="page-title">Past Digital Dialogues</h2>
          {sortedItems.past.map(item => <Entry item={item} headshots={headshots} key={item.airtable_id} />)}
        </section>
        <Paginator count={pageCount} path="digital-dialogues" />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query DialoguesQuery($skip: Int!, $limit: Int!) {
    allEventsJson (
      limit: $limit
      skip: $skip
      filter: {
        event_type: {eq: "Digital Dialogue"}
      }
      sort: {
        fields: [start_date], order: [DESC]
      }
    ) {
      nodes {
        airtable_id
        event_title
        talk_title
        talk_subtitle
        type: event_type
        start: start_date
        end: end_date
        location
        speakers {
          name
          affiliations {
            title
            department
            institution
          }
          person_group
          slug
          new_id
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
 
export default DialogueIndex
