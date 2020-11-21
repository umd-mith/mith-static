import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'
import SEO from '../components/seo'
import EventTime from '../components/event-time'

const Event = ({ pageContext: event }) => {
  return (
    <Layout>
      <SEO title={event.title} />
      <section className="post flow" itemProp="event" itemScope itemType="https://schema.org/Event">
        <h1 className="post-title" itemProp="name">
          <FontAwesomeIcon icon="calendar" /> &nbsp; {event.title}
        </h1> 
        <div className="post-meta">
          <EventTime start={event.start} end={event.end} />
          <div itemProp="location">{event.location}</div>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: event.description.childMarkdownRemark.html }} />
      </section>
    </Layout>
  )
}

export default Event
