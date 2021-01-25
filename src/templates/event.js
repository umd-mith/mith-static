import React from 'react'
// import { Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Speaker from '../components/speaker'

import './event.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Event = ({ pageContext: event }) => {
  const speakers = event.speakers ? event.speakers : []
    const title = event.image
    ? <Img 
      fluid={event.image.localFiles[0].childImageSharp.fluid} 
      alt={event.event_title} 
      className="event-image" 
    /> : <h1 className="title" itemProp="name">{event.talk_title || event.event_title}</h1>

  return (
    <Layout>
      <SEO title={event.title} />
      <div className="page-event">
        <section className="event" itemProp="event" itemScope itemType="https://schema.org/Event">
          {title}
          <div className="metadata">
            <ul className="inline-list">
              {speakers.map(p => (
                <li><Speaker person={p.data} /></li>
              ))}
            </ul>
            <EventTime start={event.start} end={event.end} />
            <div itemProp="location">{event.location}</div>
          </div>
          <div className="description" dangerouslySetInnerHTML={{ __html: event.description ? event.description.childMarkdownRemark.html : ''}} />
        </section>
      </div>
    </Layout>
  )
}

export default Event
