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
      <SEO title="MITH News" />
      <section className="leader">
        <h1>News</h1>
      </section>
      <section className="news">
        {posts.map(post => {
          const slug = path.basename(post.fileAbsolutePath, '.md')
          const linkSlug = '/news/' + slug
          const metadata = data.allAirtable.nodes.filter(n => n.data.slug === slug)[0]
          if (!metadata) return null
          return (
            <article className="post" key={`news-${post.id}`}>
              <h2 className="post-title">
                <Link to={linkSlug}>{metadata.data.post_title}</Link>
              </h2>
              <div className="post-meta">
                by <span className="author">{metadata.data.author_name}</span>
                {' '}on <time>{metadata.data.post_date}</time>
              </div>
              <div className="post-excerpt">
                {post.excerpt} 
                <Link to={linkSlug} className="read-more">continue reading</Link>
              </div>
            </article>
          )
        })}
      </section>
      <div className="pagination">
        <span class="label hidden">Pages:</span>
        {Array.from({ length: pageCount }, (_, i) => (
          <Link
            activeClassName="active" 
            className="page-link"
            key={`pagination-number${i + 1}`}
            to={`/news/${i === 0 ? "" : i + 1}`}>
            {i + 1}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostsQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {fields: {sourceName: {eq: "news"}}}
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
      filter: {
        table: {eq: "Posts"}
        data: {DD_Post: {eq: null}, Event_Post: {eq: null}}
      }
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
