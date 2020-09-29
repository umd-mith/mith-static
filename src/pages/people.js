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
          {data.people.nodes.map(item => {
            return (
              <div>
                <Link key={`p-${item.data.id}`} to={item.data.slug}>{item.data.name}</Link>
              </div>
            )
          })}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PeopleQuery {
    people: allAirtable(filter: {table: {eq: "People"}}, sort: {fields: data___last}) {
      nodes {
        data {
          id
          name
          slug
          headshot {
            thumbnails {
              large {
                url
              }
            }
          }
        }
      }
    }
  }
`
 
export default PeoplePage