import React from 'react'
import { graphql } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'
import './people.css'

const PeoplePastPage = ({ data }) => {
  
  function makePerson(person) {
    return (
    <article className="person" id={person.new_id} title={person.name} key={`p-${person.new_id}`}>
      <h3 className="name">{person.name}</h3>
      <div className="details">
        {person.linked_identities.map(identity => (
          <article className="identity" id={identity.id} key={`i-${identity.id}`}>
            <span className="title">{identity.title}</span>
            <span className="date-span">
              <span className="start">{identity.start}</span>
              <span className="end">{identity.end}</span>
            </span>   
          </article>
        ))}     
      </div>
    </article>
    )    
  }

  function makeGroup(people) {
    return people.nodes.map(person => {
      return makePerson(person)
    })
  }
  return (
    <Layout>
      <SEO title="Past People" />
      <div className="page-past-people">
        <section className="leader hidden">
          <h1 className="page-title text-hidden">Past People</h1>
        </section>
        <section id="past_directors" className="people-group">
          <h2>Past Directors</h2>
          {data.people.group
            .filter(g => g.fieldValue === 'Past Directors')
            .map(makeGroup)
          }
        </section>
        <section id="past_staff" className="people-group">
          <h2>Past Research Faculty &amp; Staff</h2>
          {data.people.group
            .filter(g => g.fieldValue === 'Past Research Faculty + Staff')
            .map(makeGroup)
          }
        </section>

      </div>
    </Layout>
  )
}
export const query = graphql`
  query PeoplePastQuery {
    people: allPeopleJson(
      filter: {
        group_type: {regex: "/Past/"}
      }, 
      sort: {
        fields: last
      }
    ) {
      group(field: people_groups) {
        fieldValue
        nodes {
          name
          first
          last
          linked_identities {
            title
            start
            end
          }
          new_id
        }
      }
    }
  }
`
 
export default PeoplePastPage