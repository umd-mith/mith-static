import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import './post-index.css'

const Research = ({ pageContext: item }) => {
  return (
    <Layout>
      <SEO title={item.title} />
      <section className="post flow">
        <h1 className="post-title">{item.title}</h1> 
        <div className="post-meta">
          Directors: <span className="director">{item.directors}</span>
          {' '}started on <time>{item.year_start}</time>
        </div>       
        <div className="post-content">
          {item.excerpt}
        </div>
      </section>
    </Layout>
  )
}

export default Research
