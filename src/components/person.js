import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Person = ({ person, type }) => {

  let pageLocation = null
  if (person.person_group) {
    pageLocation = person.slug ? person.slug : null
  }
  let person_name = pageLocation
    ? <Link className="name" key={`p-${person.new_id}`} to={`../../people/${pageLocation}`} aria-label={`View ${person.name}'s Profile`} title={`View ${person.name}'s Profile`}>{person.name}</Link>
    : <div className="name">{person.name}</div>

    let date_span = null
    if ( type === "director" ) {
      const start = person.start ? <span className="start">{person.start}</span> : null
      const end = person.end ? <span className="end">{person.end}</span> : null
      if (person.start && person.end ) {
        date_span = <div className="date-span">({start} &ndash; {end})</div>
    } 
    if (person.start && !person.end) {
      const end = person.person_group ?  <> &ndash; <span className="end">present</span></> : null
      date_span = <div className="date-span">({start}{end})</div>
    }
  } 

  let person_title = null
  let person_institution = null
  let person_dept = null
  if ( !person.person_group ) { // hide titles for current staff
    if ( type === "speaker" || type === "participant" || type === "director" ) {
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
  let bio = null
  if (type === "speaker") {
    const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
    twitter = person.twitter
      ? <a href={`https://twitter.com/${person.twitter}`} className="twitter" target="_blank" rel="noreferrer">{iconTwitter} {person.twitter}</a> 
      : null

    headshot = person.headshot
      ? <Img 
        fluid={person.headshot.localFiles[0].childImageSharp.fluid} 
        alt={person.name} 
        className="headshot" 
      /> : null

    bio = person.bio ? <div className="bio">{person.bio}</div> : null
  }

  return (
    <li className="person" id={person.new_id} title={person.name} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
      {headshot}
      {person_name}
      <span className="details">
        {person_title}
        {person_dept}
        {person_institution}
        {date_span}
        {twitter}
      </span>
      {bio}
    </li>
  )
}

export default Person