import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image';

import Layout from '../components/layout'
import SEO from '../components/seo'

import './people.css'

const PeoplePage = ({ data }) => { 

  function makePerson(person, useWebsite=false) {
    let pageLocation = person.id
    if (useWebsite) {
      if (person.website) {
        pageLocation = person.website.startsWith('http')
          ? person.website
          : `http://${person.website}`
      } else {
        pageLocation = null
      }
    }
    let img = ''
      if (person.fields.headshot) {
        const el = <Img 
            fluid={person.fields.headshot.childImageSharp.fluid} 
            alt={`Headshot of ${person.name}`} 
            className="headshot" 
            imgStyle={{
              objectFit: "cover",
            }}
            role="img"
          />
        img = pageLocation
          ? <Link key={`p-${person.id}`} to={pageLocation}>{el}</Link>
          : el
      }
      let persName = pageLocation 
        ? <Link key={`p-${person.id}`} to={pageLocation}>{person.name}</Link>
        : person.name
      return (
      <article className="person" id={person.id} title={person.name} key={`p-${person.id}`}>
        {img}
        <h3 className="name">{persName}</h3>
        <div className="title">{person.title}</div>
      </article>
      )    
  }

  function makeStaff(people) {    
    return people.nodes.map(person => {
      return makePerson(person)
    })
  }

  function makeAffiliates(affiliates) {    
    return affiliates.nodes.map(person => {
      return makePerson(person, true)
    })
  }

  return (
		<Layout>
      <SEO title="People" />
      <div className="page-people">
        <section className="leader hidden">
          <h1 className="page-title text-hidden">People</h1>
        </section>
        <section id="facstaff" className="people-group">
          <h2>Faculty &amp; Staff</h2>
          {data.people.group
            .filter(g => g.fieldValue === 'Staff')
            .map(makeStaff)
          }
        </section>
        <section id="affiliates" className="people-group">
          <h2>Affiliates</h2>
          {data.people.group
            .filter(g => g.fieldValue === 'Affiliates')
            .map(makeAffiliates)
          }
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PeopleQuery {
    people: allPeopleJson(
      sort: {
        fields: last
      }, 
      filter: {
        group_type: {in: ["Staff", "Affiliates"]}
      }
    ) {
      group(field: group_type) {
        fieldValue
        nodes {
          website
          id
          name
          first
          last
          title
          fields {
            headshot {
              childImageSharp {
                fluid( maxHeight: 500, maxWidth: 500, fit: COVER, background: "rgba(255,255,255,0)" ) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
              }
            }
          }
        }
      }
    }
  }
`
 
export default PeoplePage