import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image';

import Layout from '../components/layout'
import SEO from '../components/seo'
import './people.css'

const PeoplePage = ({ data }) => { 

  function makePeople(people) {
    return people.nodes.map(person => {
      const img = person.data.headshot 
      ? <Link key={`p-${person.data.new_id}`} to={person.data.slug}>
        <Img 
          fluid={person.data.headshot.localFiles[0].childImageSharp.fluid} 
          alt={`Headshot of ${person.data.name}`} 
          className="headshot" 
          imgStyle={{
            objectFit: "cover",
          }}
        />
        </Link>
      : ''
      return (
      <article className="person" id={person.data.new_id} title={person.data.name} key={`p-${person.data.new_id}`}>
        {img}
        <h3 className="name"><Link key={`p-${person.data.new_id}`} to={person.data.slug}>{person.data.name}</Link></h3>
        <div className="title">{person.data.title}</div>
      </article>
      )
    })
  }  

  return (
		<Layout>
      <SEO title="People" />
      <div className="page-people">
        <section id="facstaff" className="people-group">
          <h1>Faculty &amp; Staff</h1>
          {data.people.group
            .filter(g => g.fieldValue !== 'Affiliates' && g.fieldValue.match(/^[^P]/))
            .map(makePeople)
          }
        </section>
        <section id="affiliates" className="people-group">
          <h1>Affiliates</h1>
          {data.people.group
            .filter(g => g.fieldValue === 'Affiliates')
            .map(makePeople)
          }
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PeopleQuery {
    people: allAirtable(
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