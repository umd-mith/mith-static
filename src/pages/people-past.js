import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'

const PeoplePastPage = ({ data }) => {
  return (
		<Layout>
      <div>
        <section>
          <SEO title="Past People" />
          <h1 className="hidden">Past People</h1>
        </section>
        <section> 
          {data.people.nodes.map(group => {
            return (
              <div key={`g-${group.data.id}`}>
                <h2>{group.data.group_name}</h2>
                  <div className="columns">
                    {
                    group.data.linked_people ?
                      group.data.linked_people.map(person => (
                        <article className="col-4 col-4-lg col-4-md col-6-sm col-12-xs">
                          <Link key={`p-${person.data.id}`} to={person.data.slug}><h4>{person.data.name}</h4></Link>
                          <>{
                            person.data.date_spans ? 
                            person.data.date_spans.map(dates => (
                              <span key={`d-${dates.data.id}`}>{dates.data.date_span}</span>
                            ))
                            : ''
                          }</>
                        </article>
                      ))
                    : ''
                    }
                  </div>
              </div>
            )
          })}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PeoplePastQuery {
    people: allAirtable(
      filter: {
        table: {eq: "Staff Groups"}, 
        data: {group_name: {regex: "/Past/"}}
      }, 
      sort: {
        fields: data___sort
      }
    ) {
      nodes {
        data {
          id
          group_name
          linked_people {
            data {
              id
              name
              date_spans {
                data {
                  date_span
                }
              }
            }
          }
        }
      }
    }
  }
`
 
export default PeoplePastPage