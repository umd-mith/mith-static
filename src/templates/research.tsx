import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import ResearchTime from '../components/research-time'
import EventTime from "../components/event-time"
import Person, { PersonComponentProps } from "../components/person"
// import TaxonomyList from '../components/taxonomy-list'
import SupporterList, {
  SupporterComponentProps,
} from "../components/supporter-list"

import "./research.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// TODO: simplify / aggregate with types on gastby-node
type Affiliation =
  | NonNullable<
      NonNullable<
        Queries.PageResearchQuery["allAirtableResearchItems"]["nodes"][number]["data"]
      >["linked_internal_participant_affiliations"]
    >[number]
  | NonNullable<
      NonNullable<
        Queries.PageResearchQuery["allAirtableResearchItems"]["nodes"][number]["data"]
      >["linked_external_participant_affiliations"]
    >[number]
type ExtendedLinkedParticipant = NonNullable<
  NonNullable<
    Queries.PageResearchQuery["allAirtableResearchItems"]["nodes"][number]["data"]
  >["linked_participants"]
>[number] & {
  affiliations?: Affiliation[]
}
type ExtendedPageResearchQuery =
  Queries.PageResearchQuery["allAirtableResearchItems"]["nodes"][number]["data"] & {
    participants?: ExtendedLinkedParticipant[]
    directors?: ExtendedLinkedParticipant[]
  }

interface ResearchProps {
  pageContext: ExtendedPageResearchQuery
}

const Research = ({ pageContext: item }: ResearchProps) => {
  let header = <h1 className="title">{item.title}</h1>
  let description: JSX.Element | undefined
  const img = item.image
  if (img && img.localFiles) {
    header = (
      <GatsbyImage
        image={img.localFiles[0]?.childImageSharp?.gatsbyImageData!}
        alt={item.title || ""}
        className="research-image"
      />
    )
  }
  if (item.description) {
    description = (
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: item.description.childMarkdownRemark?.html || "",
        }}
      />
    )
  }

  // const start = item.month_start ? `${item.year_start}-${item.month_start}` : item.year_start
  // let end: string | number
  // if (item.year_end) {
  //   end = item.month_end ? `${item.year_end}-${item.month_end}` : item.year_end
  // }
  // const dates = <ResearchTime start={start} end={end} active={item.active} />

  let participant_list = null
  let participants = null
  if (item.participants) {
    participant_list = item.participants.map((p, i) => {
      return (
        <Person
          key={`p${i}`}
          person={p.data as unknown as PersonComponentProps}
          type="participant"
        />
      )
    })
    participants = (
      <div className="participants">
        <h2>Participants</h2>
        <ul>{participant_list}</ul>
      </div>
    )
  }

  let director_list = null
  let directors = null
  if (item.directors) {
    const directors_title = item.directors.length > 1 ? "Directors" : "Director"
    director_list = item.directors.map(person => {
      return (
        <Person
          person={person.data as unknown as PersonComponentProps}
          type="director"
        />
      )
    })
    directors = (
      <div className="directors">
        <h2>{directors_title}</h2>
        <ul>{director_list}</ul>
      </div>
    )
  }

  let twitter = null
  if (item.twitter_account) {
    const iconTwitter = <FontAwesomeIcon icon={["fab", "twitter"]} />
    const twitter_acct = item.twitter_account ? (
      <span className="twitter_acct">
        <a
          href={`https://twitter.com/${item.twitter_account}`}
          target="_blank"
          rel="noreferrer"
        >
          {item.twitter_account}
        </a>
      </span>
    ) : null
    // const twitter_hash = item.twitter_hashtag
    //   ? <span className="twitter_hash">
    //     <a href={`https://twitter.com/hashtag/${item.twitter_hashtag}`} target="_blank" rel="noreferrer">#{item.twitter_hashtag}</a>
    //   </span> : null
    twitter = (
      <div className="twitter">
        {iconTwitter} {twitter_acct}
      </div>
    )
  }

  let links_list = null
  let links = null
  let link_url = null
  if (item.linked_links) {
    links_list = item.linked_links.map(_l => {
      const l = _l?.data!
      link_url = l.url?.startsWith("http") ? l.url : `http://${l.url}`
      return (
        <li id={l.title || ""}>
          <a
            href={link_url}
            title={l.title || ""}
            target="_blank"
            rel="noreferrer"
          >
            {l.title}
          </a>
        </li>
      )
    })
    links = (
      <div className="links">
        <h2>Links</h2>
        <ul>{links_list}</ul>
      </div>
    )
  }

  const sponsors =
    item.linked_sponsors && item.linked_sponsors.length > 0 ? (
      <SupporterList
        supporters={item.linked_sponsors as SupporterComponentProps}
        type="sponsor"
      />
    ) : (
      ""
    )
  const partners =
    item.linked_partners && item.linked_partners.length > 0 ? (
      <SupporterList
        supporters={item.linked_partners as SupporterComponentProps}
        type="partner"
      />
    ) : (
      ""
    )

  let events_list = null
  let events = null
  if (item.linked_events) {
    events_list = item.linked_events.map(_e => {
      const e = _e?.data!
      return (
        <li id={e.id!} className="event">
          <h3 className="title">
            <Link key={`e-${e.id}`} to={`../../events/${e.id}`}>
              {e.talk_title || e.event_title}
            </Link>
          </h3>
          <EventTime
            start={parseInt(e.start_date!)}
            end={parseInt(e.end_date!)}
          />
          <div itemProp="location" className="location">
            {e.location}
          </div>
          <div className="description"></div>
          <Link
            className="button"
            key={`e-${e.id}`}
            to={`../../events/${e.id}`}
          >
            View Event Details
          </Link>
        </li>
      )
    })
    events = (
      <div className="events">
        <h2>Events</h2>
        <ul>{events_list}</ul>
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
            <Link key={`n-${n.slug || ""}`} to={`../../news/${n.slug}`}>
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

  // const disciplines = item.disciplines
  // ? <TaxonomyList terms={item.disciplines} type="disciplines" />
  // : ''

  // const methods = item.methods
  // ? <TaxonomyList terms={item.methods} type="methods" />
  // : ''

  return (
    <Layout>
      <SEO title={item.title || ""} />
      <div className="page-research-item">
        <section className="research-item">
          {header}
          <div className="content">
            {description}
            {events}
          </div>
          <div className="sidebar metadata">
            {/* {dates} */}
            {twitter}
            {directors}
            {participants}
            {links}
            {news}
            {partners}
            {sponsors}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Research
