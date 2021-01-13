import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ResearchTime from '../components/research-time'

//import './post-index.css'
import './research.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Research = ({ pageContext: item }) => {

  function makePerson(person, showTitle=false) {
    let pageLocation = person.data.slug
    let person_name = pageLocation
      ? <Link className="meta name" key= {`p-${person.data.new_id}`} to={`../../people/${pageLocation}`}>{person.data.name}</Link>
      : <div className="meta name">{person.data.name}</div>
    let person_title = null
    let person_affiliation = null
    let person_dept = null
    if (showTitle) {
      person_title = person.data.title 
        ? <span className="meta title">{person.data.title}</span>
        : null
      person_affiliation = person.data.affiliation
        ? <span className="meta affiliation">{person.data.affiliation}</span>
        : null
      person_dept = person.data.department 
        ? <span className="meta dept">{person.data.department}</span>
        : null
    } 
    return (
      <div className="person" id={person.data.new_id} title={person.data.name} key={`p-${person.data.new_id}`}>
        {person_name}
        {person_title}
        {person_dept}
        {person_affiliation}
      </div>
    )
  }

  let director_list = null
  let directors = null
  if (item.linked_directors) {
    director_list = item.linked_directors.map(person => {
      return makePerson(person)
    })
    let count = item.linked_directors.length
    let dir_header = "Director"
    if (count > 1) {
      dir_header = "Directors"
    } 
    directors = <div className="directors"><h2>{dir_header}</h2>{director_list}</div>
  }

  let participant_list = null
  let participants = null
  if (item.linked_participants) {
    participant_list = item.linked_participants.map(person => {
      return makePerson(person, true)
    })
    participants = <div className="participants"><h2>Participants</h2>{participant_list}</div>
  }

  const title = item.image
    ? <Img 
      fluid={item.image.localFiles[0].childImageSharp.fluid} 
      alt={item.title} 
      className="research-image" 
    /> : <h1 className="title">{item.title}</h1>
  const start = item.month_start ? `${item.year_start}-${item.month_start}` : item.year_start
  const end = item.month_end ? `${item.year_end}-${item.month_end}` : item.year_end

  let twitter = null
  if (item.twitter_account || item.twitter_hashtag) {
    const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
    const twitter_acct = item.twitter_account
      ? <span className="meta twitter_acct">
          <a href={`https://twitter.com/${item.twitter_account}`}>{item.twitter_account}</a>
        </span> : null
    const twitter_hash = item.twitter_hashtag 
      ? <span className="meta twitter_hash">
        <a href={`https://twitter.com/hashtag/${item.twitter_hashtag}`}>#{item.twitter_hashtag}</a>
      </span> : null
    twitter = <div className="twitter">{iconTwitter} {twitter_acct} {twitter_hash}</div>
  }

  let links_list = null
  let links = null
  let link_url = null
  if (item.linked_links) {
    links_list = item.linked_links.map(l => {
        link_url = l.data.url.startsWith('http') 
          ? l.data.url 
          : `http://${l.data.url}`
        return <li id={l.data.link_id}><a href={link_url}>{l.data.title}</a></li>
    })
    links = <div className="links"><h2>Links</h2><ul>{links_list}</ul></div>
  }

  let sponsors_list = null
  let sponsors = null
  let sponsor_name = null
  if (item.linked_sponsors) {
    sponsors_list = item.linked_sponsors.map(s => {
        if (s.data.website) {
          sponsor_name = s.data.website.startsWith('http') 
            ? s.data.website
            : <a href={`http://${s.data.website}`}>{s.data.name}</a>
        } else {
          sponsor_name = s.data.name
        }
      return <li id={s.data.slug}>{sponsor_name}</li>
    })
    sponsors = <div className="sponsors"><h2>Sponsors</h2><ul>{sponsors_list}</ul></div>
  }

  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-research-item">
        <section className="research-item">
          {title}
          <div className="metadata">
            <div className="time"><ResearchTime start={start} end={end} /></div>
            {twitter}
            {directors}
            {participants}
            {links}
            {sponsors}
          </div>       
          <div className="description" 
            dangerouslySetInnerHTML={{ __html: item.description ? item.description.childMarkdownRemark.html : ''}} 
          />
        </section>
      </div>
    </Layout>
  )
}

export default Research
