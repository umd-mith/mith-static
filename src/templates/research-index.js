import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Paginator from '../components/paginator'
//import ResearchTime from '../components/research-time'

import './post-index.css'
import './research-index.css'

const ResearchIndex = ({data}) => {
  const items = data.allResearchJson.nodes
  const pageCount = data.allResearchJson.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH Research" />
      <div className="page-research">
        <section className="posts research">
          <h1 className="page-title">Research</h1>
          {items.map(item => {
            const slug = '/research/' + item.slug + '/'
            const active = item.active === 'TRUE' ? <span className="pill">Active</span> : ''
            const started = item.year_start ? <span><time>{item.year_start}</time></span> : ''
            const ended = item.year_end ? <span> &ndash; <time>{item.year_end}</time></span> : ''

            let excerpt = ''
            let image = ''
            let title = <h2 className="title"><Link to={slug}>{item.title}</Link></h2>
            if (item.fields) {
              if (item.fields.image) {
                image = <GatsbyImage 
                  image={item.fields.image.childImageSharp.gatsbyImageData}
                  alt={item.title} 
                  className="research-image" 
                />
              title = <Link to={slug}>{image}</Link>
              }
              if (item.fields.markdownDescription) {
                excerpt = item.fields.markdownDescription.childMarkdownRemark.excerpt
              }
            }

            return (
              <article className="post research-item-post" key={`research-${item.id}`}>
                {title}
                <div className="meta">
                  {active} {started}{ended}
                </div>
                <div className="post-excerpt">
                  {excerpt}
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
    allResearchJson(
      limit: $limit
      skip: $skip
      sort: {
        fields: [active, slug], 
        order: [DESC, ASC]
      }
    ) {
      nodes{
        id
        title
        slug
        year_start
        month_start
        year_end
        month_end
        active
        fields {
          markdownDescription {
            childMarkdownRemark {
                excerpt(pruneLength: 250)
              }
          }
          image {
            childImageSharp {
              gatsbyImageData(width: 500, quality: 100, backgroundColor: "rgba(255,255,255,0)")
            }
          }
        }
      }
      pageInfo {
        pageCount
      }
    }
  }
`
 
export default ResearchIndex
