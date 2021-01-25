import React from 'react'
import { Link } from 'gatsby'

const Person = ({ person, showTitle }) => {

  let pageLocation = null
  if (person.affiliation_as_current) {
    pageLocation = person.slug ? person.slug : null
  }

  let person_name = pageLocation
    ? <Link className="meta name" key={`p-${person.new_id}`} to={`../../people/${pageLocation}`}>{person.name}</Link>
    : <div className="meta name">{person.name}</div>
  let person_title = null
  let person_affiliation = null
  let person_dept = null
  if (showTitle) {
    person_title = person.title 
      ? <span className="meta title">{person.title}</span>
      : null
      person_dept = person.department 
      ? <span className="meta dept">{person.department}</span>
      : null
    person_affiliation = person.affiliation
      ? <span className="meta affiliation">{person.affiliation}</span>
      : null
  } 
  return (
    <li className="person" id={person.new_id} title={person.name} key={`p-${person.new_id}`} itemProp="performer" itemScope="https://schema.org/Person">
      {person_name}
      {person_title}
      {person_dept}
      {person_affiliation}
    </li>
  )
}

export default Person