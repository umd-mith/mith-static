import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Post = ({ data, pageContext: post }) => {
  const postInfo = data.postInfo.nodes[0]
  if (!postInfo) return null
  const metadata = postInfo.data
  return (
    <Layout>
      <SEO title={metadata.post_title} />
      <section className="post">
        <h1 className="post-title">{metadata.post_title}</h1> 
        <div className="post-meta">
          by {metadata.author_name} on {metadata.post_date}
          {' '}in {metadata.categories.join(', ')}
        </div>       
        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    postInfo: allAirtable(filter: {table: {eq: "Posts"}, data: {
      DD_Post: {eq: null}, Event_Post: {eq: null}, slug: {eq: $slug}}}) {
      nodes {
        data {
          slug
          author_name
          post_title
          post_date(formatString: "MMMM D, YYYY")
          categories
        }
      }
    }
  }
`

export default Post