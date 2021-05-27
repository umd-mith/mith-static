import React from 'react'
// import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './event.css'
import './dialogue.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dialogue = ({ pageContext: item }) => {
  
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
  let speaker_bio = null
  const speakers_data = item.speakers ? item.speakers : []
  if (item.speakers.length > 0) {
    speakers_list = speakers_data.map((p, i) => {
      return <Person key={`p${i}`} person={p} type="dialogue" />
    })
    speakers = <div className="speakers">
      <h2 className="hidden">Speakers</h2>
      {speakers_list}
    </div>
    speaker_bios_list = speakers_data.map(b => {
      if (b.bio) {
        speaker_bio = <div id={b.slug} className="speaker-bio">{b.bio}</div>
      }
      return <>{speaker_bio}</>
    })
    speaker_bios = speaker_bios_list 
      ? <div className="bios">
        <h2 className="hidden">Speaker Bios</h2>
        {speaker_bios_list}
      </div> : ''
  }

  let sponsors_list = null
  let sponsors = null
  let sponsor_name = null
  if (item.sponsors.length > 0) {
    sponsors_list = item.sponsors.map(s => {
        if (s.website) {
          sponsor_name = s.website.startsWith('http') 
            ? <a href={s.website} title={s.name} target="_blank" rel="noreferrer">{s.name}</a>
            : <a href={`http://${s.website}`} title={s.name} target="_blank" rel="noreferrer">{s.name}</a>
        } else {
          sponsor_name = <span>s.name</span>
        }
      return <li id={s.slug}>{sponsor_name}</li>
    })
    sponsors = <div className="sponsors">
      <h2 className="hidden">Sponsors</h2>
      <ul>Sponsored by {sponsors_list}</ul>
    </div>
  }

  let partners_list = null
  let partners = null
  let partner_name = null
  if (item.partners.length > 0) {
    partners_list = item.partners.map(s => {
        if (s.website) {
          partner_name = s.website.startsWith('http') 
            ? <a href={s.website} title={s.name} target="_blank" rel="noreferrer">{s.name}</a>
            : <a href={`http://${s.website}`} title={s.name} target="_blank" rel="noreferrer">{s.name}</a>
        } else {
          partner_name = s.name
        }
      return <li id={s.slug}>{partner_name}</li>
    })
    partners = <div className="partners">
      <h2>Partners</h2>
      <ul>{partners_list}</ul>
    </div>
  }

  let links_list = null
  let links = null
  let link_name = null
  if (item.links.length > 0) {
    links_list = item.links.map(l => {
        if (l.url) {
          link_name = l.url.startsWith('http') 
            ? <a href={l.url} rel="noreferrer">{l.title}</a>
            : <a href={`http://${l.url}`} title={l.title} target="_blank" rel="noreferrer">{l.title}</a>
        } else {
          link_name = l.title
        }
      return <li className={l.type}>{link_name}</li>
    })
    links = <div className="links">
      <h2>Resources</h2>
      <ul>{links_list}</ul>
    </div>
  }

  let disciplines_list = null
  let disciplines = null
  if (item.disciplines.length > 0) {
    disciplines_list = item.disciplines.map(l => {
      return <li className="pill">{l.term}</li>
    })
    disciplines = <div className="disciplines">
      <h2>Disciplines</h2>
      <ul>{disciplines_list}</ul>
    </div>
  }

  let methods_list = null
  let methods = null
  if (item.methods.length > 0) {
    methods_list = item.methods.map(l => {
      return <li className="pill">{l.term}</li>
    })
    methods = <div className="methods">
      <h2>Methods</h2>
      <ul>{methods_list}</ul>
    </div>
  }

  const iconVideo = <FontAwesomeIcon icon="play-circle" />
  const video_id = item.video_id ? item.video_id : ''
  const video_link = video_id
    ? <div className="video-link">
        <a className="button" href={`https://vimeo.com/${video_id}`} target="_blank" rel="noreferrer">
          {iconVideo} Watch Dialogue Video
        </a>
      </div> : ''

  const livestream = item.livestream
    ? <div className="livestream-link">
        <a className="button" href={item.livestream} target="_blank" rel="noreferrer">
          Watch Livestream
        </a>
      </div> : ''

  const video = video_id
    ? <div className="video">
        <h2>Media</h2>
        <div className="video-wrapper">
          <iframe title={`${title} Video`} src={`https://player.vimeo.com/video/${video_id}?color=afbc21&title=0&byline=0&portrait=0`} frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div> : ''

  const dd_info = <section className="dd-info">
    <p>A continuously updated schedule of talks is also available on the Digital Dialogues webpage.</p>
    <p>Unable to attend the events in person? Archived podcasts can be found on the MITH website, and you can follow our Digital Dialogues Twitter account <a href="https://twitter.com/@digdialog">@digdialog</a> as well as the Twitter hashtag <a href="https://twitter.com/hashtag/#mithdd">#mithdd</a> to keep up with live tweets from our sessions. Viewers can watch the live stream as well.</p>
    <p>All talks free and open to the public. Attendees are welcome to bring their own lunches.</p>
    <p>Contact: MITH (<a href="http://mith.umd.edu">mith.umd.edu</a>, <a href="mailto:mith@umd.edu">mith@umd.edu</a>, 301.405.8927).</p>
  </section>


  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-dialogue">
        <section className="dialogue event" itemProp="event" itemScope itemType="https://schema.org/Event">
          {header}
          <div className="content">
            <div className="metadata">
              <EventTime start={item.start} end={item.end} />
              <div itemProp="location" className="location">{item.location}</div>
            </div>
            {speakers}
            {description}
            {speaker_bios}
            {video}
          </div>
          <div className="sidebar">
            {sponsors}
            {partners}
            {video_link}
            {livestream}
            {links}
            {disciplines}
            {methods}
          </div>
        </section>
        {dd_info}
      </div>
    </Layout>
  )
}

export default Dialogue
