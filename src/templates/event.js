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
          {event.start} - {event.end}
        </div>       
        <div className="post-content">
          {event.description}
        </div>
      </section>
    </Layout>
  )
}

export default Event
