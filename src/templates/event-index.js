import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'

import './post-index.css'
import './research-index.css'

const EventIndex = ({data}) => {
  const items = data.allAirtable.nodes.map(n => n.data)
  const pageCount = data.allAirtable.pageInfo.pageCount

  return (
		<Layout>
      <SEO title="MITH Research" />
      <div className="page-news">
        <section className="news">
          <h1>Research</h1>
          {items.map(item => {
            const slug = '/research/' + item.slug
            const active = item.active === 'TRUE' ? <span class="research-active">Active</span> : ''
            const ended = item.year_end ? <span> ended on <time>{item.year_end}</time></span> : ''

            return (
              <article className="post" key={`research-${item.id}`}>
                <h2 className="post-title">
                  <Link to={slug}>{item.title}</Link>
                </h2>
                <div className="post-meta">
                  {active}
                  Directors: <span className="author">{item.project_directors}</span>
                  {' '}started on <time>{item.year_start}</time>
                  {ended}
                </div>
                <div className="post-excerpt">
                  {item.description_excerpt} 
                </div>
              </article>
            )
          })}
        </section>
        <Paginator count={pageCount} path="research" />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query EventsQuery($skip: Int!, $limit: Int!) {
    allAirtable(
      filter: {
        table: {eq: "Events"}
      }
      limit: $limit
      skip: $skip
      sort: {fields: [data___active, data___slug], order: [DESC, ASC]}
    ) {
      nodes {
        data {
          id
          slug
          title: event_title
          talkTitle: talk_title
          description
          startDate: start_date
          startTime: start_time
          endDate: endDate
          endTime: endTime
          location
          topics
          vimeoUrl: vimeo_url
          liveStreamUrl: livestream_url
          storifyUrl: storify_url
          sutoriUrl: sutori_recap_url
          twitterMomentUrl: twitter_moment
          files
          adhoDisciplines: ADHO_Taxonomy_Disciplines__from_topics_
          adhoMethods: ADHO_Taxonomy_Methods__from_topics_
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
 
export default EventIndex
