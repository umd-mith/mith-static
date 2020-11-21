import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import './post-index.css'
import './research.css'

const Research = ({ pageContext: project }) => {
  const img = project.image ? <img className="project-image" alt={project.title} src={project.image[0].thumbnails.large.url} /> : ''
  return (
    <Layout>
      <SEO title={project.title} />
      <section className="post flow">
        <h1 className="post-title">
          {img}
          {project.title}
        </h1> 
        <div className="post-meta">
          Directors: <span className="director">{project.directors}</span>
          {' '}started on <time>{project.year_start}</time>
        </div>       
        <div className="post-content" dangerouslySetInnerHTML={{ __html: project.description ? project.description.childMarkdownRemark.html : ''}} />
      </section>
    </Layout>
  )
}

export default Research
