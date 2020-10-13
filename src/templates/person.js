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
  const icon_email = <FontAwesomeIcon icon="envelope" />
  const email = person.email
    ? <><a className="meta email" href={`mailto:${person.email}`}>
        {icon_email} {person.email}
      </a></> : ''
  const icon_phone = <FontAwesomeIcon icon="mobile-alt" />
  const phone = person.phone
    ? <p className="meta phone">{icon_phone} {person.phone}</p> : ''
  const website = person.website
    ? <><a className="meta website" href={person.website}>{person.website}</a></> : ''
  const icon_twitter = <FontAwesomeIcon icon={['fab', 'twitter']} />
  const twitter = person.twitter
    ? <><a className="meta twitter" href={`https://twitter.com/${person.twitter}`}>
        {icon_twitter} {person.twitter}
      </a></> : ''
  const bio = person.bio
    ? <div className='col-12' dangerouslySetInnerHTML={{ __html: person.bio.childMarkdownRemark.html }} /> : ''

  return (
    <Layout>
      <SEO title={name} />
      <section className="leader">
        <h1>{name}</h1>
      </section>
      <section className="columns">
        {photo}
        <div className="col-8 col-8-lg col-8-md col-7-sm col-6-xs">
          <h2 className="title">{person.title}</h2>
          <div className="metadata">
            {email} {phone} {website} {twitter}
          </div>
        </div>
        {bio}
      </section>
    </Layout>
  )
}

export default Person