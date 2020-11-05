import React from 'react'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import './person.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Person = ({ pageContext: person }) => {
  const name = person.name
  const photo = person.headshot 
    ? <Img 
      fluid={person.headshot.localFiles[0].childImageSharp.fluid} 
      alt={`Headshot of ${person.name}`} 
      className="col-4 col-4-lg col-4-md col-5-sm col-6-xs headshot"
      imgStyle={{
        objectFit: "cover",
      }}
      />
    : ''
  const iconEmail = <FontAwesomeIcon icon="envelope" />
  const email = person.email
    ? <><a className="meta email" href={`mailto:${person.email}`}>
        {iconEmail} {person.email}
      </a></> : ''
  const iconPhone = <FontAwesomeIcon icon="mobile-alt" />
  const phone = person.phone
    ? <p className="meta phone">{iconPhone} {person.phone}</p> : ''
  const iconWeb = <FontAwesomeIcon icon="globe" />
  const website = person.website
    ? <><a className="meta website" href={`https://${person.website}`}>{iconWeb} {person.website}</a></> : ''
  const iconTwitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
  const twitter = person.twitter
    ? <><a className="meta twitter" href={`https://twitter.com/${person.twitter}`}>
        {iconTwitter} {person.twitter}
      </a></> : ''
  const bio = person.bio
    ? <div className='col-12' dangerouslySetInnerHTML={{ __html: person.bio.childMarkdownRemark.html }} /> : ''

  return (
    <Layout>
      <SEO title={name} />
      <div className="page-person">
      <h1>{name}</h1>
      <section className="person">
        {photo}
        <div>
          <h2 className="title">{person.title}</h2>
          <div className="metadata">
            {email} {phone} {website} {twitter}
          </div>
        </div>
        {bio}
      </section>
      </div>
    </Layout>
  )
}

export default Person
