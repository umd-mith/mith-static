import React from 'react'
// import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './event.css'

const Event = ({ pageContext: item }) => {
  
  const subtitle = item.talk_subtitle 
    ? <h2 className="subtitle">{item.talk_subtitle}</h2> : ''
  const title = <h1 className="title" itemProp="name">{item.talk_title || item.event_title}</h1>
  
  const header = item.image
    ? <GatsbyImage 
      image={item.image.localFiles[0].childImageSharp.gatsbyImageData} 
      alt={item.event_title} 
      className="event-image" 
    /> : <div className="header">{title}{subtitle}</div>
    
  const description = item.fields.eventsDescription 
    ? <div className="description" 
      dangerouslySetInnerHTML={{ __html: item.fields.eventsDescription.childMarkdownRemark.html }} 
    /> : ''
  
  let speakers_list = null
  let speakers = null
  let speaker_bios_list = null
  let speaker_bios = null
  const speakers_data = item.speakers ? item.speakers : []
  if (item.speakers.length > 0) {
    speakers_list = speakers_data.map((p, i) => {
      return <Person key={`p${i}`} person={p} type="speaker" />
    })
    speakers = <div className="speakers">
      <h2 className="hidden">Speakers</h2>
      <ul>{speakers_list}</ul>
    </div>
    speaker_bios_list = speakers_data.map(b => {
      if (b.bio != null) {
        return <div id={b.id} className="speaker-bio">{b.bio}</div>
      }
    })
    speaker_bios = <div className="bios">
      <h2 className="hidden">Speaker Bios</h2>
      {speaker_bios_list}
    </div>
  }

  let sponsors_list = null
  let sponsors = null
  let sponsor_name = null
  if (item.sponsors.length > 0) {
    sponsors_list = item.sponsors.map(s => {
        if (s.website) {
          sponsor_name = s.website.startsWith('http') 
            ? s.website
            : <a href={`http://${s.website}`} title={s.name} target="_blank" rel="noreferrer">{s.name}</a>
        } else {
          sponsor_name = s.name
        }
      return <li id={s.slug}>{sponsor_name}</li>
    })
    sponsors = <div className="sponsors">
      <h2>Sponsors</h2>
      <ul>{sponsors_list}</ul>
    </div>
  }

  let partners_list = null
  let partners = null
  let partner_name = null
  if (item.partners.length > 0) {
    partners_list = item.partners.map(p => {
        if (p.website) {
          partner_name = p.website.startsWith('http') 
            ? p.website
            : <a href={`http://${p.website}`} target="_blank" rel="noreferrer">{p.name}</a>
        } else {
          partner_name = p.name
        }
      return <li id={p.slug}>{partner_name}</li>
    })
    partners = <div className="partners">
      <h2>Partners</h2>
      <ul>{partners_list}</ul>
    </div>
  }

  let dd_info = null
  if (item.type === "Digital Dialogue") {
    dd_info = <section className="dd-info">
      <p>A continuously updated schedule of talks is also available on the Digital Dialogues webpage.</p>
      <p>Unable to attend the events in person? Archived podcasts can be found on the MITH website, and you can follow our Digital Dialogues Twitter account <a href="https://twitter.com/@digdialog">@digdialog</a> as well as the Twitter hashtag <a href="https://twitter.com/hashtag/#mithdd">#mithdd</a> to keep up with live tweets from our sessions. Viewers can watch the live stream as well.</p>
      <p>All talks free and open to the public. Attendees are welcome to bring their own lunches.</p>
      <p>Contact: MITH (<a href="http://mith.umd.edu">mith.umd.edu</a>, <a href="mailto:mith@umd.edu">mith@umd.edu</a>, 301.405.8927).</p>
    </section>
  }

  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-event">
        <section className="event" itemProp="event" itemScope itemType="https://schema.org/Event">
          {header}
          <div className="metadata">
            <EventTime start={item.start} end={item.end} />
            <div itemProp="location" className="location">{item.location}</div>
          </div>
          {speakers}
          {description}
          {speaker_bios}
          {sponsors}
          {partners}
        </section>
        {dd_info}
      </div>
    </Layout>
  )
}

export default Event
