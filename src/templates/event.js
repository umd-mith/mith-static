import React from 'react'
// import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './event.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Event = ({ pageContext: item }) => {
  const title = item.image
  ? <GatsbyImage 
    fluid={item.image.localFiles[0].childImageSharp.gatsbyImageData} 
    alt={item.event_title} 
    className="event-image" 
  /> : <h1 className="title" itemProp="name">{item.talk_title || item.event_title}</h1>

  let speakers_list = null
  let speakers = null
  const speakers_data = item.speakers ? item.speakers : []
  if (item.speakers) {
    speakers_list = speakers_data.map(p => {
      return <Person person={p.data} showTitle="true" type="speaker" />
    })
    speakers = <div className="speakers">
      <h2 className="hidden">Speakers</h2>
      <ul>{speakers_list}</ul>
    </div>
  }

  let dd_info = null
  if (item.type === "Digital Dialogue") {
    dd_info = <section className="dd-info">
      A continuously updated schedule of talks is also available on the Digital Dialogues webpage.

      Unable to attend the events in person? Archived podcasts can be found on the MITH website, and you can follow our Digital Dialogues Twitter account <a href="https://twitter.com/@digdialog">@digdialog</a> as well as the Twitter hashtag <a href="https://twitter.com/hashtag/#mithdd">#mithdd</a> to keep up with live tweets from our sessions. Viewers can watch the live stream as well.

      All talks free and open to the public. Attendees are welcome to bring their own lunches.

      Contact: MITH (mith.umd.edu, <a href="mailto:mith@umd.edu">mith@umd.edu</a>, 301.405.8927).
    </section>
  }

  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-event">
        <section className="event" itemProp="event" itemScope itemType="https://schema.org/Event">
          {title}
          <div className="metadata">
            <EventTime start={item.start} end={item.end} />
            <div itemProp="location" className="location">{item.location}</div>
          </div>
          {speakers}
        </section>
        {dd_info}
      </div>
    </Layout>
  )
}

export default Event
