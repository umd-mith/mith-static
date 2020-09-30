import path from 'path'
import React from 'react'
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'


const NewsPage = (data) => {
  const posts = data.data.allMarkdownRemark.nodes
  return (
		<Layout>
      <div>
        <section>
          <SEO title="MITH News" />
          <h1>News</h1>
        </section>
        <section> 
          {posts.map(post => {
            const slug = path.basename(path.dirname(post.fileAbsolutePath)) + '/'
            return (
              <div key={`news-${post.id}`}>
                <Link to={slug}>{post.frontmatter.title}</Link>
              </div>
            )
          })}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostsQuery {
    allMarkdownRemark(sort: {fields: frontmatter___published, order: DESC}) {
      nodes {
        frontmatter {
          categories
          description
          image
          published
          redirect_from
          title
          type
        }
        html
        fileAbsolutePath
        timeToRead
        id
      }
    }
  }
`
 
export default NewsPage