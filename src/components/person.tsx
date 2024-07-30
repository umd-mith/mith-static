import React, { Fragment } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import type { IGatsbyImageData } from "gatsby-plugin-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export type PersonComponentProps = {
  group_type: string
  slug: string
  new_id: string
  name: string
  affiliations: {
    data: {
      start: number
      end: number
      title: string
      department: string
      institution: string
    }
  }[]
  twitter: string
  website: string
  bio: {
    childMarkdownRemark: { html: string }
  }
  headshot: {
    localFiles: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      url: string
    }[]
  }
}

interface PersonProps {
  person: PersonComponentProps
  type: string
}

const Person = ({ person, type }: PersonProps) => {
  let pageLocation = null
  const isStaff = person.group_type && person.group_type.includes("Staff")
  if (isStaff) {
    pageLocation = person.slug ? person.slug : null
  }
  let person_name = pageLocation ? ( // link current staff names to profile
    <Link
      className="name"
      id={person.new_id}
      key={`p-${person.new_id}`}
      to={`../../people/${pageLocation}`}
      aria-label={`View ${person.name}'s Profile`}
      title={`View ${person.name}'s Profile`}
    >
      {person.name}
    </Link>
  ) : (
    <div className="name" id={person.new_id}>
      {person.name}
    </div>
  )

  let date_span = null
  if (type === "director") {
    const _aff = person.affiliations
    if (_aff && _aff[0]) {
      const aff = _aff[0].data
      const start = aff.start ? (
        <span className="start">{aff.start}</span>
      ) : null
      const end = aff.end ? <span className="end">{aff.end}</span> : null
      if (aff.start && aff.end) {
        date_span = (
          <div className="date-span">
            ({start} &ndash; {end})
          </div>
        )
      }
      if (aff.start && !aff.end) {
        const end = isStaff ? (
          <>
            {" "}
            &ndash; <span className="end">present</span>
          </>
        ) : null
        date_span = (
          <div className="date-span">
            ({start}
            {end})
          </div>
        )
      }
    }
  }

  let affiliations: JSX.Element[] | undefined
  if (person.affiliations) {
    affiliations = person.affiliations.map(_aff => {
      const aff = _aff.data
      let person_title = null
      let person_institution = null
      let person_dept = null
      if (!isStaff) {
        // hide titles for current staff
        if (
          type === "speaker" ||
          type === "dialogue" ||
          type === "participant" ||
          type === "director"
        ) {
          person_title = aff.title ? (
            <span className="title">{aff.title}</span>
          ) : null
          person_dept = aff.department ? (
            <span className="dept">{aff.department}</span>
          ) : null
          person_institution = aff.institution ? (
            <span className="institution">{aff.institution}</span>
          ) : null
        }
        if (type === "dialogue-index") {
          person_institution = aff.institution ? (
            <span className="institution">{aff.institution}</span>
          ) : null
        }
      }
      return (
        <Fragment key={aff.title}>
          {person_title}
          {person_dept}
          {person_institution}
        </Fragment>
      )
    })
  }

  let twitter = null
  let headshot = null
  let website = null
  let hasImg = ""
  if (type === "speaker" || type === "dialogue" || type === "dialogue-index") {
    const iconTwitter = <FontAwesomeIcon icon={["fab", "twitter"]} />
    twitter = person.twitter ? (
      <a
        href={`https://twitter.com/${person.twitter}`}
        className="twitter"
        target="_blank"
        rel="noreferrer"
      >
        {iconTwitter} {person.twitter}
      </a>
    ) : null
    if (person.headshot) {
      const headshotData = person.headshot.localFiles[0]
      if (headshotData.childImageSharp) {
        headshot = (
          <GatsbyImage
            image={headshotData.childImageSharp.gatsbyImageData}
            alt={person.name}
            className="headshot"
          />
        )
      } else {
        headshot = (
          <img
            src={headshotData.url}
            alt={`Headshot of ${person.name}`}
            className="headshot"
            style={{
              objectFit: "cover",
            }}
          />
        )
      }
      hasImg = "has-headshot"
    }
  }
  const bio_link =
    person.bio && person.bio.childMarkdownRemark ? (
      <a href={`#${person.slug}`} className="bio-link">
        Read Bio
      </a>
    ) : null

  const person_bio =
    person.bio && person.bio.childMarkdownRemark ? (
      <div
        className="bio"
        dangerouslySetInnerHTML={{
          __html: person.bio.childMarkdownRemark.html,
        }}
      />
    ) : (
      ""
    )

  if (person.website) {
    const website_url = person.website.startsWith("http")
      ? person.website
      : `http://${person.website}`
    website = (
      <a href={website_url} target="_blank" rel="noreferrer">
        Website
      </a>
    )
  }

  if (type === "dialogue-index") {
    // TODO: default typing for itemScope is boolean | undefined, which is incorrect.
    return (
      <div
        className={`speaker person ${hasImg}`}
        id={person.new_id}
        title={person.name}
        key={`p-${person.new_id}`}
        itemProp="performer"
        // @ts-expect-error
        // ^~~~~~~~~~~~~~~^ error: "Type 'string' is not assignable to type 'boolean | undefined' (2322)"
        itemScope="https://schema.org/Person"
      >
        {headshot}
        <div className="details">
          {person_name}
          <div className="info">{affiliations}</div>
        </div>
      </div>
    )
  }
  if (type === "dialogue") {
    return (
      <span
        className={`speaker person ${hasImg}`}
        id={person.new_id}
        key={`p-${person.new_id}`}
        itemProp="performer"
        // @ts-expect-error
        // ^~~~~~~~~~~~~~~^ error: "Type 'string' is not assignable to type 'boolean | undefined' (2322)"

        itemScope="https://schema.org/Person"
      >
        {headshot}
        <div className="details">
          {person_name}
          <div className="info">
            {affiliations}
            {twitter}
            {website}
            {bio_link}
          </div>
        </div>
      </span>
    )
  }
  if (type === "speaker") {
    return (
      <span
        className={`speaker person ${hasImg}`}
        id={person.new_id}
        key={`p-${person.new_id}`}
        itemProp="performer"
        // @ts-expect-error
        // ^~~~~~~~~~~~~~~^ error: "Type 'string' is not assignable to type 'boolean | undefined' (2322)"

        itemScope="https://schema.org/Person"
      >
        {headshot}
        <div className="details">
          {person_name}
          <div className="info">
            {affiliations}
            {twitter}
            {website}
          </div>
        </div>
        {person_bio}
      </span>
    )
  }
  if (type !== "dialogue-index" && type !== "dialogue") {
    return (
      <div
        className={`person ${hasImg}`}
        id={person.new_id}
        key={`p-${person.new_id}`}
        itemProp="performer"
        // @ts-expect-error
        // ^~~~~~~~~~~~~~~^ error: "Type 'string' is not assignable to type 'boolean | undefined' (2322)"

        itemScope="https://schema.org/Person"
      >
        {headshot}
        <div className="details">
          {person_name}
          <div className="info">
            {affiliations}
            {date_span}
            {twitter}
            {website}
          </div>
        </div>
      </div>
    )
  }
}

export default Person
