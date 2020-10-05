import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby';

const Post = ({ data, pageContext: post }) => {
  const metadata = data.people.nodes[0].data
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <section className='post'>
        <h1>{post.frontmatter.title}</h1> 
        <div className="post-meta">
          by {metadata.name} on {post.frontmatter.published} in {post.frontmatter.categories.join(', ')}
        </div>       
        <div 
          className='content'
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($author: String!) {
    people: allAirtable(filter: {table: {eq: "People"}, data: {slug: {eq: $author}}}) {
      nodes {
        data {
          slug
          name
        }
      }
    }
  }
`

export default Post