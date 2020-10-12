import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby';

const Post = ({ data, pageContext: post }) => {
  const postInfo = data.postInfo.nodes[0]
  if (!postInfo) return null
  const metadata = postInfo.data
  return (
    <Layout>
      <SEO title={metadata.post_title} />
      <section className='post'>
        <h1>{metadata.post_title}</h1> 
        <div className="post-meta">
          by {metadata.author_name} on {metadata.post_date}
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
  query($slug: String!) {
    postInfo: allAirtable(filter: {table: {eq: "Posts"}, data: {slug: {eq: $slug}}}) {
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

export default Post