import React from 'react'
import { graphql } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'
import './people.css'

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
              <div key={`g-${group.data.id}`} className={`people-group ${group.data.slug}`}>
                <h2>{group.data.group_name}</h2>
                  <div className="columns">
                    {
                    group.data.linked_people ?
                      group.data.linked_people.map(person => (
                        <article id={person.data.slug} className="col-4 col-4-lg col-4-md col-6-sm col-12-xs">
                          <strong key={`p-${person.data.id}`}>{person.data.name}</strong>
                          <div>{
                            person.data.date_spans ? 
                            person.data.date_spans.map(dates => (
                              <span key={`d-${dates.data.id}`}>{dates.data.date_span}</span>
                            ))
                            : ''
                          }</div>
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
          new_id
          group_name
          slug
          linked_people {
            data {
              new_id
              name
              slug
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