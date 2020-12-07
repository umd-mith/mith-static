import React from 'react'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ResearchTime from '../components/research-time'

import './post-index.css'
import './research.css'

const Research = ({ pageContext: item }) => {
  const title = item.image
    ? <Img 
      fluid={item.image.localFiles[0].childImageSharp.fluid} 
      alt={item.title} 
      className="research-image" 
    /> : <h1 className="title">{item.title}</h1>
  const start = item.month_start ? `${item.year_start}-${item.month_start}` : item.year_start
  const end = item.month_end ? `${item.year_end}-${item.month_end}` : item.year_end
  return (
    <Layout>
      <SEO title={item.title} />
      <div className="page-item">
        <section className="post flow">
          {title}
          <div className="post-meta">
            Directors: <span className="director">{item.directors}</span>
            {' '}
            <ResearchTime start={start} end={end} />
          </div>       
          <div className="post-content" 
            dangerouslySetInnerHTML={{ __html: item.description ? item.description.childMarkdownRemark.html : ''}} 
          />
        </section>
      </div>
    </Layout>
  )
}

export default Research
