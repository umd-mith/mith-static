import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Paginator from "../components/paginator"
// import ResearchTime from '../components/research-time'

import "./post-index.css"
import "./research-index.css"

interface ResearchIndexProps {
  data: Queries.ResearchQuery
}

const ResearchIndex = ({ data }: ResearchIndexProps) => {
  const items = data.allAirtableResearchItems.nodes
  const sortedItems = Array.from(items).sort(
    (a: Queries.ResearchQuery["allAirtableResearchItems"]["nodes"][number]) =>
      a?.data?.active === "TRUE" ? -1 : 1,
  )
  const pageCount = data.allAirtableResearchItems.pageInfo.pageCount

  return (
    <Layout>
      <SEO title="MITH Research" />
      <div className="page-research">
        <section className="posts research">
          <h1 className="page-title">Research</h1>
          {sortedItems.map(_item => {
            const item = _item.data!
            const slug = "/research/" + item.slug + "/"
            // const active = item.active === 'TRUE' ? <span className="pill">Active</span> : ''
            // const start = item.month_start ? `${item.year_start}-${item.month_start}` : item.year_start
            let end: string | number
            if (item.year_end) {
              end = item.month_end
                ? `${item.year_end}-${item.month_end}`
                : item.year_end
            }
            // const dates = <ResearchTime start={start} end={end} active={item.active} />

            let excerpt = ""
            let image: JSX.Element | undefined
            let title = (
              <h2 className="title">
                <Link to={slug}>{item.title}</Link>
              </h2>
            )
            if (item.image) {
              image = (
                <GatsbyImage
                  image={
                    item.image.localFiles?.[0]?.childImageSharp
                      ?.gatsbyImageData!
                  }
                  alt={item.title || ""}
                  className="research-image"
                />
              )
              title = (
                <Link to={slug} className="header">
                  {image}
                </Link>
              )
            }
            if (item.description) {
              excerpt = item.description.childMarkdownRemark?.excerpt!
            }

            const itemId = item.id?.replace(/-/g, "_")

            return (
              <article
                className="post research-item-post"
                key={`research-${item.id}`}
                id={itemId}
              >
                {title}
                {/* <div className="meta">
                  {dates}
                </div> */}
                <div className="post-excerpt">{excerpt}</div>
              </article>
            )
          })}
        </section>
        <Paginator count={pageCount} path="research" />
      </div>
    </Layout>
  )
}

// TODO: We don't seem to be able to sort on both year_start and active any longer.
// Sorting on the client as a result.
export const query = graphql`
  query Research($skip: Int!, $limit: Int!) {
    allAirtableResearchItems(
      limit: $limit
      skip: $skip
      sort: { data: { year_start: DESC } }
    ) {
      nodes {
        data {
          id
          title
          slug
          year_start
          year_end
          month_end
          month_start
          active
          description {
            childMarkdownRemark {
              excerpt(pruneLength: 250)
            }
          }
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(
                  width: 500
                  quality: 100
                  backgroundColor: "rgba(255,255,255,0)"
                )
              }
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
