import React from 'react'
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout'
import SEO from '../components/seo'

const PeoplePage = ({ data }) => { 

  function makePeople(people) {
    return people.nodes.map(person => {
      const img = person.data.headshot 
      ? <Link key={`p-${person.data.id}`} to={person.data.slug}>
        <Img fluid={person.data.headshot.localFiles[0].childImageSharp.fluid} alt={`Headshot of ${person.data.name}`}/>
        </Link>
      : ''
      return (
      <article className="col-4 col-4-lg col-4-md col-6-sm col-6-xs" id={person.data.id} title={person.data.name} key={`p-${person.data.id}`}>
        {img}
        <h4><Link key={`p-${person.data.id}`} to={person.data.slug}>{person.data.name}</Link></h4>
        <p>{person.data.title}</p>
      </article>
      )
    })
  }  

  return (
		<Layout>
      <SEO title="People" />
      <div className="page-people">
        <section className="leader hidden">
          <h1>People</h1>
        </section>
        <section id="facstaff" className="columns">
          <h2>Faculty &amp; Staff</h2>
          {data.people.group
            .filter(g => g.fieldValue !== 'Affiliates' && g.fieldValue.match(/^[^P]/))
            .map(makePeople)
          }
        </section>
        <section id="affiliates" className="columns">
          <h2>Affiliates</h2>
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
            id
            slug
            name
            first
            last
            title
            headshot {
              localFiles {
                childImageSharp {
                  fluid( maxHeight: 500, maxWidth: 500, fit: CONTAIN, background: "rgba(255,255,255,0)" ) {
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