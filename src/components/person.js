import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Person = ({ person, showTitle, type }) => {

  let pageLocation = null
  if (person.affiliation_as_current) {
    pageLocation = person.slug ? person.slug : null
  }

  let person_name = pageLocation
    ? <Link className="name" key={`p-${person.new_id}`} to={`../../people/${pageLocation}`}>{person.name}</Link>
    : <div className="name">{person.name}</div>

  let person_title = null
  let person_affiliation = null
  let person_dept = null
  if (type === "speaker" || type === "participant") {
    person_title = person.title 
      ? <span className="title">{person.title}</span>
      : null
      person_dept = person.department 
      ? <span className="dept">{person.department}</span>
      : null
    person_affiliation = person.affiliation
      ? <span className="affiliation">{person.affiliation}</span>
      : null
  } 
  let twitter = null
  let headshot = null
  let bio = null
  if (type === "speaker") {
    const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
    twitter = person.twitter
      ? <a href={`https://twitter.com/${person.twitter}`} className="twitter">{iconTwitter} {person.twitter}</a> 
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
        {person_affiliation}
        {twitter}
      </span>
      {bio}
    </li>
  )
}

export default Person