import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
//import ResearchTime from '../components/research-time'
import EventTime from '../components/event-time'
import Person from '../components/person'

import './research.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Research = ({ pageContext: item }) => {

  let title = <h1 className="title">{item.title}</h1>
  let description = ''
  if (item.fields) {
    if (item.fields.image) {
      title = <GatsbyImage 
        image={item.fields.image.childImageSharp.gatsbyImageData}
        alt={item.title} 
        className="research-image" 
      />
    }
    if (item.fields.researchDescription) {
      description = <div className="description" 
        dangerouslySetInnerHTML={{ __html: item.fields.researchDescription.childMarkdownRemark.html }} 
      />
    }
  }

  const started = item.year_start ? <span className="started">{item.year_start}</span> : ''
  const ended = item.year_end ? <span className="ended">{item.year_end}</span> : ''
  //const start = item.month_start ? `${item.year_start}-${item.month_start}` : item.year_start
  //const end = item.month_end ? `${item.year_end}-${item.month_end}` : item.year_end

  let participant_list = null
  let participants = null
  if (item.participants.length > 0) {
    participant_list = item.participants.map((p, i) => {
      return <Person key={`p${i}`} person={p} showTitle="true" type="participant" />
    })
    participants = <div className="participants">
      <h2>Participants</h2>
      <ul>{participant_list}</ul>
    </div>
  }
  
  let director_list = null
  let directors = null
  if (item.directors.length > 0) {
    director_list = item.directors.map(person => {
      return <Person person={person} showTitle="true" type="director" />
    })
    directors = <div className="directors">
      <h2>Directors</h2>
      <ul>{director_list}</ul>
    </div>
  }

  let twitter = null
  if (item.twitter_account || item.twitter_hashtag) {
    const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
    const twitter_acct = item.twitter_account
      ? <span className="twitter_acct">
          <a href={`https://twitter.com/${item.twitter_account}`} target="_blank" rel="noreferrer">{item.twitter_account}</a>
        </span> : null
    const twitter_hash = item.twitter_hashtag 
      ? <span className="twitter_hash">
        <a href={`https://twitter.com/hashtag/${item.twitter_hashtag}`} target="_blank" rel="noreferrer">#{item.twitter_hashtag}</a>
      </span> : null
    twitter = <div className="twitter">{iconTwitter} {twitter_acct} {twitter_hash}</div>
  }

  let links_list = null
  let links = null
  let link_url = null
  if (item.links.length > 0) {
    links_list = item.links.map(l => {
        link_url = l.url.startsWith('http') 
          ? l.url 
          : `http://${l.url}`
        return <li id={l.link_id}><a href={link_url} title={l.title} target="_blank" rel="noreferrer">{l.title}</a></li>
    })
    links = <div className="links"><h2>Links</h2><ul>{links_list}</ul></div>
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
    sponsors = <div className="sponsors"><h2>Sponsors</h2><ul>{sponsors_list}</ul></div>
  }

  let events_list = null 
  let events = null
  if (item.events.length > 0) {
    events_list = item.events.map(e => {
      return <li id={e.id}>
          <h3 className="title" itemProp="name"><Link key={`e-${e.id}`} to={`../../events/${e.id}`}>{e.talk_title || e.event_title}</Link></h3>
          <EventTime start={e.start} end={e.end} />
          <div itemProp="location" className="location">{e.location}</div>
          <div className="description"></div>
          <Link className="button" key={`e-${e.id}`} to={`../../events/${e.id}`}>View Event Details</Link>
        </li>
    })
    events = <div className="events"><h2>Events</h2><ul>{events_list}</ul></div>
  }

  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-research-item">
        <section className="research-item">
          {title}
          {description}
          <div className="metadata">
            <div className="date">
              {started}{ended}
            </div>
            {twitter}
            {directors}
            {participants}
            {links}
            {sponsors}
          </div>       
          {events}
        </section>
      </div>
    </Layout>
  )
}

export default Research
