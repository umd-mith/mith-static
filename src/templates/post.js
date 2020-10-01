import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Post = ({ pageContext: post }) => {
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <section className='post'>
        <h1>{post.frontmatter.title}</h1>        
        <div 
          className='content'
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>
    </Layout>
  )
}

export default Post