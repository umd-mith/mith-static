import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Person = ({ person, type }) => {

  let pageLocation = null
  if (person.person_group) {
    pageLocation = person.slug ? person.slug : null
  }
  let person_name = pageLocation // link current staff names to profile
    ? <Link 
      className="name" 
      key={`p-${person.new_id}`} 
      to={`../../people/${pageLocation}`} 
      aria-label={`View ${person.name}'s Profile`} 
      title={`View ${person.name}'s Profile`}>{person.name}</Link>
    : <div className="name">{person.name}</div>

    let date_span = null
    if ( type === "director" ) {
      const start = person.start 
        ? <span className="start">{person.start}</span> : null
      const end = person.end 
        ? <span className="end">{person.end}</span> : null
      if (person.start && person.end ) {
        date_span = <div className="date-span">({start} &ndash; {end})</div>
    } 
    if (person.start && !person.end) {
      const end = person.person_group 
        ?  <> &ndash; <span className="end">present</span></> : null
      date_span = <div className="date-span">({start}{end})</div>
    }
  } 

  let person_title = null
  let person_institution = null
  let person_dept = null
  if ( !person.person_group ) { // hide titles for current staff
    if ( type === "speaker" || type === "dialogue" || type === "participant" || type === "director" ) {
    person_title = person.title 
      ? <span className="title">{person.title}</span>
      : null
      person_dept = person.department 
      ? <span className="dept">{person.department}</span>
      : null
    person_institution = person.institution
      ? <span className="institution">{person.institution}</span>
      : null
    }
  }
  let twitter = null
  let headshot = null
  let website = null
  if (type === "speaker" || type === "dialogue") {
    const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
    twitter = person.twitter
      ? <a href={`https://twitter.com/${person.twitter}`} className="twitter" target="_blank" rel="noreferrer">{iconTwitter} {person.twitter}</a> 
      : null
    if (person.headshot) {
      if (person.headshot.childImageSharp) {
        headshot = <GatsbyImage 
          image={person.headshot.localFiles[0].childImageSharp.gatsbyImageData} 
          alt={person.name} 
          className="headshot" 
        />
      } else {
        headshot = <img
          src={person.headshot.url}
          alt={`Headshot of ${person.name}`} 
          className="headshot"
          style={{
            objectFit: "cover",
          }} 
        />
      }
    }
  }
  const bio = person.bio ? <a href={`#${person.slug}`} className="bio-link">Read Bio</a> : null

  if (person.website) {
    const website_url = person.website.startsWith('http') 
      ? person.website : `http://${person.website}`
    website = <a href={website_url} target="_blank" rel="noreferrer">Website</a>
  }

  if (type === "dialogue-index") {
    return (
      <li className="speaker person" id={person.new_id} title={person.name} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
        {person_name}
        {person_institution}
      </li>
    )
  }
  if (type === "dialogue") {
    return (
      <span className="speaker person" id={person.new_id} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
        {headshot}
        {person_name}
        <span className="details">
          {person_title}
          {person_dept}
          {person_institution}
          {twitter}
          {website}
          {bio}
        </span>
      </span>
    )
  } 
  if (type !== "dialogue-index" && type !== "dialogue") {
    return (
      <li className="person" id={person.new_id} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
        {headshot}
        {person_name}
        <span className="details">
          {person_title}
          {person_dept}
          {person_institution}
          {date_span}
          {twitter}
        </span>
      </li>
    )
  }
}

export default Person