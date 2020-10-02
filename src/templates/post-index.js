import path from 'path'
import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'

import './post-index.css'

const PostIndex = (data) => {
  const posts = data.data.allMarkdownRemark.nodes
  return (
		<Layout>
      <div>
        <section className="news">
          <SEO title="MITH News" />
          <h1>News</h1>
          {posts.map(post => {
            const slug = path.basename(path.dirname(post.fileAbsolutePath)) + '/'
            return (
              <article className="post" key={`news-${post.id}`}>
                <div className="title">
                  <Link to={slug}>{post.frontmatter.title}</Link>
                </div>
                <div className="post-meta">
                  <time>{post.frontmatter.published}</time> by <span className="author">{post.frontmatter.author}</span>
                </div>
                <div>
                  {post.excerpt} <Link to={slug}>read more</Link>
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostsQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: frontmatter___published, order: DESC}
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt(pruneLength: 250)
        frontmatter {
          author
          categories
          description
          image {
            publicURL
            relativePath
          }
          published(formatString: "MMMM D, YYYY")
          redirect_from
          title
          type
        }
        html
        fileAbsolutePath
        timeToRead
        id
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        currentPage
      }
    }
  }
`
 
export default PostIndex