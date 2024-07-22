import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

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
    if (person.headshot.localFiles[0].childImageSharp) {
      const el = <GatsbyImage 
        image={person.headshot.localFiles[0].childImageSharp.gatsbyImageData}
        alt={`Headshot of ${person.name}`} 
        imgStyle={{
          objectFit: "cover",
        }}
      />
      img = pageLocation
        ? <Link key={`p-${person.new_id}`} id={person.new_id} to={pageLocation} className="headshot">{el}</Link>
        : el
    }

    let persName = pageLocation 
      ? <Link key={`p-${person.new_id}`} id={person.new_id} to={pageLocation}>{person.name}</Link>
      : person.name

    let identities = ''
    if (person.identities_as_current) {
      identities = person.identities_as_current.map(_identity => {
        const identity = _identity.data
        return (identity.department === 'MITH' || identity.department === 'Maryland Institute for Technology in the Humanities' || identity.department === null)
          ? <div className="identity" id={identity.id} key={`i-${identity.id}`}>
            <span className="title">{identity.title}</span>
          </div>
          : <div className="identity" id={identity.id} key={`i-${identity.id}`}>
            <span className="title">{identity.title}</span>
            <span className="department">{identity.department}</span>
          </div>
      })
    }

    return (
      <article className="person" id={person.new_id} title={person.name} key={`p-${person.new_id}`}>
        {img}
        <h3 className="name">{persName}</h3>
        {identities}
      </article>
    )    
  }

  function makeStaff(people) { 
    return people.nodes.map(person => {
      return makePerson(person.data)
    })
  }

  function makeAffiliates(affiliates) {    
    return affiliates.nodes.map(person => {
      return makePerson(person.data, true)
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
    people: allAirtablePeople(
      filter: {data: {group_type: {in: ["Staff", "Affiliates"]}}}
      sort: {data: {name: ASC}}
    ) {
      group(field: {data: {group_type: SELECT}}) {
        fieldValue
        nodes {
          data {
            id
            new_id
            name
            website
            twitter
            identities_as_current {
              data {
                id
                title
                department
                institution
              }
            }
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    width: 500
                    height: 500
                    transformOptions: {fit: COVER}
                    backgroundColor: "rgba(255,255,255,0)"
                  )
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