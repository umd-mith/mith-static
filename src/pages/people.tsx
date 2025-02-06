import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import slugify from "slugify"

interface PeopleQuery {
  allNotionDatabase: {
    nodes: Array<{
      childrenNotionPage: Array<{
        properties: {
          Email: string
          Job_Title: string
          Social_Media_Profile: string
          sortName: string
        }
        childMarkdownRemark: {
          html: string
        }
        title: string
        id: string
      }>
    }>
  }
}

const PeoplePage = ({ data }: { data: PeopleQuery }) => {
  const people = data.allNotionDatabase?.nodes
    .flatMap(n => n.childrenNotionPage)
    .sort((a, b) => a.properties.sortName.localeCompare(b.properties.sortName))

  return (
    <Layout>
      <SEO title="People" />
      <div className="page-people">
        <section className="people-group">
          <h2>Faculty & Staff</h2>
          {people.map(person => (
            <article key={person.id} className="person">
              <h3 className="name">
                <Link to={`/people/${slugify(person.title, { lower: true })}/`}>
                  {person.title}
                </Link>
              </h3>
              {person.properties.Job_Title && (
                <div className="identity">
                  <span className="title">{person.properties.Job_Title}</span>
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PeopleList {
    allNotionDatabase {
      nodes {
        childrenNotionPage {
          properties {
            Email
            Job_Title
            Social_Media_Profile
            sortName
          }
          childMarkdownRemark {
            html
          }
          title
          id
        }
      }
    }
  }
`

export default PeoplePage
