import React from 'react'
// import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './event.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Event = ({ pageContext: event }) => {
  const title = event.image
  ? <GatsbyImage 
    image={event.image.localFiles[0].childImageSharp.gatsbyImageData} 
    alt={event.event_title} 
    className="event-image" 
  /> : <h1 className="title" itemProp="name">{event.talk_title || event.event_title}</h1>

  let speakers_list = null
  let speakers = null
  const speakers_data = event.speakers ? event.speakers : []
  if (event.speakers) {
    speakers_list = speakers_data.map(p => {
      return <Person person={p.data} showTitle="true" type="speaker" />
    })
    speakers = <div className="speakers">
      <h2 className="hidden">Speakers</h2>
      <ul>{speakers_list}</ul>
    </div>
  }

  let dd_info = null
  if (event.type === "Digital Dialogue") {
    dd_info = <section className="dd-info">
      A continuously updated schedule of talks is also available on the Digital Dialogues webpage.

      Unable to attend the events in person? Archived podcasts can be found on the MITH website, and you can follow our Digital Dialogues Twitter account <a href="https://twitter.com/@digdialog">@digdialog</a> as well as the Twitter hashtag <a href="https://twitter.com/hashtag/#mithdd">#mithdd</a> to keep up with live tweets from our sessions. Viewers can watch the live stream as well.

      All talks free and open to the public. Attendees are welcome to bring their own lunches.

      Contact: MITH (mith.umd.edu, <a href="mailto:mith@umd.edu">mith@umd.edu</a>, 301.405.8927).
    </section>
  }

  return (
    <Layout>
      <SEO title={event.title} />
      <div className="page-event">
        <section className="event" itemProp="event" itemScope itemType="https://schema.org/Event">
          {title}
          <div className="metadata">
            <EventTime start={event.start} end={event.end} />
            <div itemProp="location" className="location">{event.location}</div>
          </div>
          <div className="description abstract" 
            dangerouslySetInnerHTML={{ __html: event.description ? event.description.childMarkdownRemark.html : ''}} 
          />
          {speakers}
        </section>
        {dd_info}
      </div>
    </Layout>
  )
}

export default Event
