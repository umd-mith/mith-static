import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ResearchTime from '../components/research-time'

import './post-index.css'
import './research.css'

const Research = ({ pageContext: item }) => {

  function makePerson(person, showTitle=false) {
    let pageLocation = person.data.slug

    let person_name = pageLocation
      ? <Link className="person-name" key= {`p-${person.data.new_id}`} to={`../../people/${pageLocation}`}>{person.data.name}</Link>
      : <div className="person-name">{person.data.name}</div>

    let person_title = null
    let person_affiliation = null
    let person_dept = null
    if (showTitle) {
      person_title = person.data.title 
        ? <span className="person-title">{person.data.title}</span>
        : null
      person_affiliation = person.data.affiliation
        ? <span className="person-affiliation">{person.data.affiliation}</span>
        : null
      person_dept = person.data.department 
        ? <span className="person-dept">{person.data.department}</span>
        : null
    } 

    return (
      <div className="research-person" id={person.data.new_id} title={person.data.name} key={`p-${person.data.new_id}`}>
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

  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-research-item">
        <section className="research-item">
          {title}
          <div className="metadata">
            <div className="time"><ResearchTime start={start} end={end} /></div>
            {directors}
            {participants}
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
