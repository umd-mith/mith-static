import path from 'path'
import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'

import './post-index.css'

const PostIndex = ({data}) => {
  const posts = data.allMarkdownRemark.nodes
  const pageCount = data.allMarkdownRemark.pageInfo.pageCount

  return (
		<Layout>
      <div>
        <section className="news">
          <SEO title="MITH News" />
          <h1>News</h1>
          {posts.map(post => {
            const slug = path.basename(post.fileAbsolutePath, '.md')
            const metadata = data.allAirtable.nodes.filter(n => n.data.slug === slug)[0]
            if (!metadata) return null
            return (
              <article className="post" key={`news-${post.id}`}>
                <div className="title">
                  <Link to={metadata.data.slug}>{metadata.data.post_title}</Link>
                </div>
                <div className="post-meta">
                  by <span className="author">{metadata.data.author_name}</span>
                  {' '}on <time>{metadata.data.post_date}</time>
                </div>
                <div>
                  {post.excerpt} <Link to={metadata.data.slug}>read more</Link>
                </div>
              </article>
            )
          })}

          <div className="pagination">
            Pages:
            {Array.from({ length: pageCount }, (_, i) => (
              <Link
                activeClassName="active" 
                key={`pagination-number${i + 1}`}
                to={`/news/${i === 0 ? "" : i + 1}`}>
                {i + 1}&nbsp;
              </Link>
            ))}
          </div>

        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostsQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: {fields: fileAbsolutePath, order: DESC}
    ) {
      nodes {
        excerpt(pruneLength: 250)
        id
        fileAbsolutePath
      }
      pageInfo {
        pageCount
      }
    }
    allAirtable(
      limit: $limit
      skip: $skip
      filter: {table: {eq: "Posts"}}
      sort: {fields: data___post_date, order: DESC}
    ) {
      nodes {
        data {
          slug
          author_name
          post_title
          post_date(formatString: "MMMM D, YYYY")          
        }
      }
    }
  }
`
 
export default PostIndex