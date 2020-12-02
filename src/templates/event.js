import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Speaker from '../components/speaker'

const Event = ({ pageContext: event }) => {
  const speakers = event.speakers ? event.speakers : []

  return (
    <Layout>
      <SEO title={event.title} />
      <section className="post flow" itemProp="event" itemScope itemType="https://schema.org/Event">
        <h1 className="post-title event" itemProp="name">
          <FontAwesomeIcon icon="calendar" /> &nbsp; {event.talkTitle || event.eventTitle}
        </h1> 
        <div className="post-meta">
          <ul className="inline-list">
            {speakers.map(p => (
              <li><Speaker person={p.data} /></li>
            ))}
          </ul>
          <EventTime start={event.start} end={event.end} />
          <div itemProp="location">{event.location}</div>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: event.description ? event.description.childMarkdownRemark.html : ''}} />
      </section>
    </Layout>
  )
}

export default Event
