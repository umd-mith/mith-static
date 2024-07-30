import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import EventTime from "../components/event-time"
import Person, { PersonComponentProps } from "../components/person"
// import TaxonomyList from '../components/taxonomy-list'
import SupporterList, {
  SupporterComponentProps,
} from "../components/supporter-list"

import "./event.css"

interface EventProps {
  pageContext: NonNullable<
    Queries.PageEventQuery["allAirtableEvents"]["nodes"][number]["data"]
  >
}

const Event = ({ pageContext: item }: EventProps) => {
  const subtitle = item.talk_subtitle ? (
    <h2 className="subtitle">{item.talk_subtitle}</h2>
  ) : (
    ""
  )
  const title = (
    <h1 className="title" itemProp="name">
      {item.talk_title || item.event_title}
    </h1>
  )

  const headerImage = item.image ? (
    <GatsbyImage
      image={item.image.localFiles?.[0]?.childImageSharp?.gatsbyImageData!}
      alt={item.event_title || ""}
      className="event-image"
    />
  ) : null

  const description = item.description ? (
    <div
      className="description"
      dangerouslySetInnerHTML={{
        __html: item.description.childMarkdownRemark?.html || "",
      }}
    />
  ) : (
    ""
  )

  let speakers_list = null
  let speakers = null
  const speakers_data = item.speakers ? item.speakers : []
  if (speakers_data.length > 0) {
    speakers_list = speakers_data.map((p, i) => {
      return (
        <Person
          key={`p${i}`}
          person={p?.data as unknown as PersonComponentProps}
          type="speaker"
        />
      )
    })
    speakers = (
      <div className="speakers-wrapper">
        <h2>Speakers</h2>
        <div className="speakers">{speakers_list}</div>
      </div>
    )
  }

  let types = null
  let types_list = null
  if (item.type) {
    types_list = item.type.map(t => {
      return (
        <span className="pill event-type" key={`t${t}`}>
          {t}
        </span>
      )
    })
    types = <span className="event-types">{types_list}</span>
  }

  const sponsors = item.sponsors ? (
    <SupporterList
      supporters={item.sponsors as SupporterComponentProps}
      type="sponsor"
    />
  ) : (
    ""
  )
  const partners = item.partners ? (
    <SupporterList
      supporters={item.partners as SupporterComponentProps}
      type="partner"
    />
  ) : (
    ""
  )

  let links_list = null
  let links = null
  let link_name = null
  if (item.linked_links) {
    links_list = item.linked_links.map(_l => {
      const l = _l.data!
      if (l.url) {
        link_name = l.url.startsWith("http") ? (
          <a href={l.url} rel="noreferrer">
            {l.title}
          </a>
        ) : (
          <a
            href={`http://${l.url}`}
            title={l.title || ""}
            target="_blank"
            rel="noreferrer"
          >
            {l.title}
          </a>
        )
      } else {
        link_name = l.title
      }
      return <li className={l.type || undefined}>{link_name}</li>
    })
    links = (
      <div className="links">
        <h2>Resources</h2>
        <ul>{links_list}</ul>
      </div>
    )
  }

  // const disciplines = item.disciplines
  // ? <TaxonomyList terms={item.disciplines} type="disciplines" />
  // : ''

  // const methods = item.methods
  // ? <TaxonomyList terms={item.methods} type="methods" />
  // : ''

  let research = null
  let research_list = null
  let research_img = null
  if (item.linked_research_item) {
    research_list = item.linked_research_item.map(_r => {
      const r = _r?.data!
      if (r.image && r.image.localFiles && r.image.localFiles[0]) {
        if (r.image.localFiles[0].childImageSharp) {
          research_img = (
            <GatsbyImage
              image={r.image.localFiles[0].childImageSharp.gatsbyImageData}
              alt={r.title || ""}
              className="related-research-item"
            />
          )
        } else {
          research_img = (
            <img
              src={r.image.localFiles[0].publicUrl}
              alt={r.title || ""}
              className="related-research-item"
            />
          )
        }
        return (
          <Link className="related-research-item" to={`../../research/${r.id}`}>
            {research_img}
          </Link>
        )
      } else {
        return (
          <Link className="related-research-item" to={`../../research/${r.id}`}>
            {r.title}
          </Link>
        )
      }
    })
    research = (
      <div className="related-research">
        <h2>Related Research</h2>
        {research_list}
      </div>
    )
  }
  let news_list = null
  let news = null
  if (item.linked_posts) {
    news_list = item.linked_posts.map(_n => {
      const n = _n?.data!
      return (
        <li id={n.slug?.toLowerCase().replace(/-/g, "_")}>
          <div className="post-title">
            <Link key={`n-${n.record_id}`} to={`../../news/${n.slug}`}>
              {n.post_title}
            </Link>
          </div>
          <div className="meta">
            <time className="post-date">{n.post_date}</time>
            <div className="author hidden">{n.author_name}</div>
          </div>
        </li>
      )
    })
    news = (
      <div className="news">
        <h2>News</h2>
        <ul>{news_list}</ul>
      </div>
    )
  }

  return (
    <Layout>
      <SEO title={item.event_title || ""} />
      <div className="page-event">
        <section
          className="event"
          itemProp="event"
          itemScope
          itemType="https://schema.org/Event"
        >
          <div className="header">
            {headerImage}
            {title}
            {subtitle}
          </div>
          <div className="content">
            <div className="metadata">
              <EventTime
                start={parseInt(item.start!)}
                end={parseInt(item.end!)}
              />
              <div itemProp="location" className="location">
                {item.location}
              </div>
            </div>
            {description}
            {speakers}
          </div>
          <div className="sidebar">
            {types}
            {links}
            {sponsors}
            {partners}
            {news}
            {research}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Event
