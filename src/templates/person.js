import React from 'react'
import Layout from '../components/layout'
// import Img from 'gatsby-image';

import SEO from '../components/seo'

const Person = ({ pageContext: person }) => {
  const title = person.name
  const img = person.headshot 
    ? <img src={person.headshot[0].thumbnails.large.url} alt={`Headshot of ${person.name}`}/>
    : ''
  const email = person.email
    ? <><dt>Email:</dt><dd>{person.email}</dd></> : ''
  const website = person.website
    ? <><dt>Website:</dt><dd>{person.website}</dd></> : ''
  const twitter = person.twitter
    ? <><dt>Twitter:</dt><dd>{person.twitter}</dd></> : ''
  const phone = person.phone
    ? <><dt>Phone:</dt><dd>{person.phone}</dd></> : ''

  const bio = person.bio
    ? <div>{person.bio}</div> : ''
  return (
    <Layout>
      <SEO title={title} />
      <section>
        <h1>{person.name}</h1>        
        {img}
        <h2>{person.title}</h2>
        <div>
          {email} {website} {twitter} {phone}
        </div>
        {bio}
      </section>
    </Layout>
  )
}

export default Person