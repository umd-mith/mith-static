import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import Paginator from '../components/paginator'
import SEO from '../components/seo'

import './post-index.css'
import './research-index.css'

const ResearchIndex = ({data}) => {
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
                  Directors: <span className="director">{item.directors}</span>
                  {' '}started on <time>{item.year_start}</time>
                  {ended}
                </div>
                <div className="post-excerpt">
                  {item.excerpt} 
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
  query ResearchQuery($skip: Int!, $limit: Int!) {
    allAirtable(
      filter: {
        table: {eq: "Projects"}
      }
      limit: $limit
      skip: $skip
      sort: {fields: [data___active, data___slug], order: [DESC, ASC]}
    ) {
      nodes {
        data {
          title
          slug
          description
          excerpt
          year_start
          month_start
          year_end
          month_end
          directors
          participants
          active
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
 
export default ResearchIndex
