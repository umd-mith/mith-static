import React from 'react'
import { Link } from 'gatsby'
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
  const speakers_data = item.speakers ? item.speakers : []
  if (item.speakers.length > 0) {
    speakers_list = speakers_data.map((p, i) => {
      return <Person key={`p${i}`} person={p} type="speaker" />
    })
    speakers = <div className="speakers-wrapper">
      <h2>Speakers</h2>
      <div className="speakers">{speakers_list}</div>
    </div>
  }

  let types = null
  let types_list = null 
  if (item.type) {
    types_list = item.type.map(t => {
      return <span className="pill event-type" key={`t${t}`}>{t}</span>
    })
    types = <span className="event-types">{types_list}</span>
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
        sponsor_name = s.name
      }
      const type = s.type.toLowerCase()
      return <li id={s.slug} className={type}>{sponsor_name}</li>
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
          ? <a href={p.website} target="_blank" rel="noreferrer">{p.name}</a>
          : <a href={`http://${p.website}`} target="_blank" rel="noreferrer">{p.name}</a>
      } else {
        partner_name = p.name
      }
      const type = p.type.toLowerCase()
      return <li id={p.slug} className={type}>{partner_name}</li>
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

  let research = null
  let research_list = null
  let research_img = null
  if (item.research.length > 0) {
    research_list = item.research.map(r => {
      if (r.image) {
        if (r.image.childImageSharp) {
          research_img = <GatsbyImage
            image={r.image.childImageSharp.gatsbyImageData}
            alt={r.title}
            className="related-research-item"
          />
        } else {
          research_img = <img
            src={r.image.url}
            alt={r.title}
            className="related-research-item"
          />
        }
        return <Link className="related-research-item" to={`../../research/${r.id}`}>{research_img}</Link>
      } else {
        return <Link className="related-research-item" to={`../../research/${r.id}`}>{r.title}</Link>
      }
    })
    research = <div class="related-research">
        <h2>Related Research</h2>
        {research_list}
      </div>
  }

  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-event">
        <section className="event" itemProp="event" itemScope itemType="https://schema.org/Event">
          {header}
          <div className="content">
            <div className="metadata">
              <EventTime start={item.start} end={item.end} />
              <div itemProp="location" className="location">{item.location}</div>
            </div>
            {description}
            {speakers}
          </div>
          <div className="sidebar">
            {types}
            {methods}
            {disciplines}
            {links}
            {sponsors}
            {partners}
            {research}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Event
