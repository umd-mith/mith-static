import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'

const PeoplePage = ({ data }) => {
  return (
		<Layout>
      <div>
        <section>
          <SEO title="MITH People" />
          <h1>MITH People</h1>
        </section>
        <section> 
          {data.people.nodes.map(group => {
            return (
              <div key={`g-${group.data.id}`}>
                <h3>{group.data.group_name}</h3>{
                  group.data.linked_people ?
                    group.data.linked_people.map(person => (
                      <div>
                        <Link key={`p-${person.data.id}`} to={person.data.slug}>{person.data.name}</Link>
                      </div>
                    ))
                  : ''
              }</div>
            )
          })}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PeopleQuery {
    people: allAirtable(filter: {table: {eq: "Staff Groups"}}, sort: {fields: data___sort}) {
      nodes {
        data {
          id
          group_name
          linked_people {
            data {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`
 
export default PeoplePage