import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ResearchTime from '../components/research-time'

import './post-index.css'
import './research.css'

const Research = ({ pageContext: project }) => {
  const title = project.image ? <img className="project-image" alt={project.title} src={project.image[0].thumbnails.large.url} /> : project.title
  const start = project.month_start ? `${project.year_start}-${project.month_start}` : project.year_start
  const end = project.month_end ? `${project.year_end}-${project.month_end}` : project.year_end
  return (
    <Layout>
      <SEO title={project.title} />
      <section className="post flow">
        <h1 className="post-title">{title}</h1> 
        <div className="post-meta">
          Directors: <span className="director">{project.directors}</span>
          {' '}
          <ResearchTime start={start} end={end} />
        </div>       
        <div className="post-content" 
          dangerouslySetInnerHTML={{ __html: project.description ? project.description.childMarkdownRemark.html : ''}} 
        />
      </section>
    </Layout>
  )
}

export default Research
