import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./person.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface PersonProps {
  pageContext: {
    name: string
    email: string
    title: string
    bio: {
      html: string
    }
    social: string
    id: string
  }
}

const Person = ({ pageContext: person }: PersonProps) => {
  const name = person.name

  const iconEmail = <FontAwesomeIcon icon="envelope" />
  const email = person.email ? (
    <span className="meta email">
      {iconEmail}
      <a href={`mailto:${person.email}`}>{person.email}</a>
    </span>
  ) : null

  const iconWeb = <FontAwesomeIcon icon="globe" />
  const social = person.social ? (
    <span className="meta website">
      {iconWeb}
      <a href={person.social}>{person.social}</a>
    </span>
  ) : null

  const bio = person.bio?.html ? (
    <div
      className="bio"
      dangerouslySetInnerHTML={{ __html: person.bio.html }}
    />
  ) : null

  return (
    <Layout>
      <SEO title={name} />
      <div className="page-person">
        <section className="person">
          <h1 className="name">{name}</h1>
          <div className="details">
            <h2 className="title">{person.title}</h2>
            <div className="metadata">
              {email} {social}
            </div>
          </div>
          {bio}
        </section>
      </div>
    </Layout>
  )
}

export default Person
