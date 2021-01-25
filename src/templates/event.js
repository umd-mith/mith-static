import React from 'react'
// import { Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './event.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Event = ({ pageContext: event }) => {
  const title = event.image
  ? <Img 
    fluid={event.image.localFiles[0].childImageSharp.fluid} 
    alt={event.event_title} 
    className="event-image" 
  /> : <h1 className="title" itemProp="name">{event.talk_title || event.event_title}</h1>

  let speakers_list = null
  let speakers = null
  const speakers_data = event.speakers ? event.speakers : []

  if (event.speakers) {
    speakers_list = speakers_data.map(p => {
      return <Person person={p.data} showTitle="true" />
    })
    speakers = <div className="speakers">
      <h2>Speakers</h2>
      <ul>{speakers_list}</ul>
    </div>
  }

  return (
    <Layout>
      <SEO title={event.title} />
      <div className="page-event">
        <section className="event" itemProp="event" itemScope itemType="https://schema.org/Event">
          {title}
          <div className="metadata">
            {speakers}
            <EventTime start={event.start} end={event.end} />
            <div itemProp="location" className="location">{event.location}</div>
          </div>
          <div className="description" 
            dangerouslySetInnerHTML={{ __html: event.description ? event.description.childMarkdownRemark.html : ''}} 
          />
        </section>
      </div>
    </Layout>
  )
}

export default Event
