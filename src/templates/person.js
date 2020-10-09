import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './person.css'

const Person = ({ pageContext: person }) => {
  const name = person.name
  const photo = person.headshot 
    ? <Img 
      fluid={person.headshot.localFiles[0].childImageSharp.fluid} 
      alt={`Headshot of ${person.name}`} 
      className="col-3 col-4-lg col-4-md col-4-sm col-6-xs headshot"
      />
    : ''
  const email = person.email
    ? <><Link className="email" to={`mailto:${person.email}`}>{person.email}</Link></> : ''
  const phone = person.phone
    ? <p>{person.phone}</p> : ''
  const website = person.website
    ? <><Link to={person.website}>{person.website}</Link></> : ''
  const twitter = person.twitter
    ? <><Link to={`https://twitter.com/${person.twitter}`}>@{person.twitter}</Link></> : ''
  const bio = person.bio
    ? <div className="col-12">{person.bio}</div> : ''

  return (
    <Layout>
      <SEO title={name} />
      <section className="leader">
        <h1>{name}</h1>
      </section>
      <section className="columns">
        {photo}
        <h2 className="col-9 col-8-lg col-8-md col-8-sm col-6-xs">{person.title}</h2>
        <div className="col-9 col-8-lg col-8-md col-8-sm col-6-xs metadata">
          {email} {website} {twitter} {phone}
        </div>
        {bio}
      </section>
    </Layout>
  )
}

export default Person