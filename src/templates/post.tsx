import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import './post.css'

interface Props {
  data: Queries.PostQuery
  pageContext: {
    html: string
  }
}

const Post = ({ data, pageContext: post }: Props) => {
  const _metadata = data.postInfo.nodes[0]
  if (!_metadata) return null
  const metadata = _metadata.data!

  return (
    <Layout>
      <SEO title={metadata.post_title || ""} />
      <div className="page-post">
        <section className="post flow">
          <h1 className="post-title">{metadata.post_title}</h1> 
          <div className="post-meta">
            by {metadata.author_name} on {metadata.post_date}
            {/* {' '}in {metadata.categories.join(', ')} */}
          </div>       
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Post($slug: String!) {
    postInfo: allAirtablePosts(
      filter: {
        data: {slug: {eq: $slug}}
      }
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

export default Post