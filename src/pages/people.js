import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image';

import Layout from '../components/layout'
import SEO from '../components/seo'

import './people.css'

const PeoplePage = ({ data }) => { 

  function makePerson(person, useWebsite=false) {
    let pageLocation = person.data.slug
    if (useWebsite) {
      if (person.data.website) {
        pageLocation = person.data.website.startsWith('http')
          ? person.data.website
          : `http://${person.data.website}`
      } else {
        pageLocation = null
      }
    }
    let img = ''
      if (person.data.headshot) {
        const el = <Img 
            fluid={person.data.headshot.localFiles[0].childImageSharp.fluid} 
            alt={`Headshot of ${person.data.name}`} 
            className="headshot" 
            imgStyle={{
              objectFit: "cover",
            }}
            role="img"
          />
        img = pageLocation
          ? <Link key={`p-${person.data.new_id}`} to={pageLocation}>{el}</Link>
          : el
      }
      let persName = pageLocation 
        ? <Link key={`p-${person.data.new_id}`} to={pageLocation}>{person.data.name}</Link>
        : person.data.name
      return (
      <article className="person" id={person.data.new_id} title={person.data.name} key={`p-${person.data.new_id}`}>
        {img}
        <h3 className="name">{persName}</h3>
        <div className="title">{person.data.title}</div>
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
            .filter(g => g.fieldValue !== 'Affiliates' && g.fieldValue.match(/^[^P]/))
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
    people: allAirtablePeopleTable(
      filter: {
        table: {eq: "People"}, 
        data: {group_type: {regex: "/^[^P].*/"}}
      }, 
      sort: {
        fields: data___last
      }
    ) 
    {
      group(field: data___group_type) {
        fieldValue
        nodes {
          data {          
            new_id
            website
            slug
            name
            first
            last
            title
            headshot {
              localFiles {
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
  }
`
 
export default PeoplePage