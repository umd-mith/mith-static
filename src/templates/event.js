import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const Event = ({ pageContext: event }) => {
  return (
    <Layout>
      <SEO title={event.title} />
      <section className="post flow">
        <h1 className="post-title">{event.title}</h1> 
        <div className="post-meta">
          Directors: <span className="author">{event.project_directors}</span>
          {' '}started on <time>{event.year_start}</time>
        </div>       
        <div className="post-content">
          {event.description_excerpt}
        </div>
      </section>
    </Layout>
  )
}

export default Event
