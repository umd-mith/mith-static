import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'

const PeoplePage = ({ data }) => { 
  return (
		<Layout>
      <div>
        <section>
          <SEO title="People" />
          <h1>People</h1>
        </section>
        <section className="columns"> 
          {data.people.nodes.map(person => {
            const img = person.data.headshot 
              ? <img src={person.data.headshot[0].thumbnails.large.url} alt={`Headshot of ${person.data.name}`}/>
              : ''
            return (
              <article className="col-4 col-4-lg col-4-md col-6-sm col-6-xs" id={person.data.id} title={person.data.name} key={`p-${person.data.id}`}>
                {img}
                <h4><Link key={`p-${person.data.id}`} to={person.data.slug}>{person.data.name}</Link></h4>
                <p>{person.data.title}</p>
              </article>
            )
          })}
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
        data: {group_type: {regex: "/^(?!P).*/"}}
      }, 
      sort: {
        fields: data___last
      }
    ) {
      nodes {
        data {
          id
          slug
          name
          first
          last
          title
          staff_group {
            data {
              group_name
              type
            }
          }
          headshot {
            thumbnails {
              large {
                url
              }
            }
          }
          group_type
        }
      }
    }
  }
`
 
export default PeoplePage