import path from 'path'
import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'

import './post-index.css'

const PostIndex = ({data}) => {
  const posts = data.allMarkdownRemark.nodes
  const pageCount = data.allMarkdownRemark.pageInfo.pageCount
  const peopleInfo = data.allAirtable.nodes

  return (
		<Layout>
      <div>
        <section className="news">
          <SEO title="MITH News" />
          <h1>News</h1>
          {posts.map(post => {
            const slug = '/news/' + path.basename(path.dirname(post.fileAbsolutePath)) + '/'
            // TEMPORARY
            const authorSlug = post.frontmatter.author === 'trevormunoz' ? 'trevor-munoz' : post.frontmatter.author
            const tm = peopleInfo.filter(n => n.data.slug === authorSlug)[0]
            const author = tm ? tm.data.name : post.frontmatter.author
            return (
              <article className="post" key={`news-${post.id}`}>
                <div className="title">
                  <Link to={slug}>{post.frontmatter.title}</Link>
                </div>
                <div className="post-meta">
                  by <span className="author">{author}</span> on <time>{post.frontmatter.published}</time>
                </div>
                <div>
                  {post.excerpt} <Link to={slug}>read more</Link>
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
        pageCount
      }
    }
    allAirtable(filter: {table: {eq: "People"}}) {
      nodes {
        data {
          name
          slug
        }
      }
    }
  }
`
 
export default PostIndex