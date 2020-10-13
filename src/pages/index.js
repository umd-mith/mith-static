import React from 'react'
//import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="page-home columns">
      <section className="leader">
        <p>MITH is a research center within the College of Arts and Humanities at the University of Maryland, College Park. The center is home to an interdisciplinary group of researchers who collaboratively advance the study of cultural heritage and arts using computational technologies and who also study computational technologies using humanities approaches. For over 20 years, this world-class concentration of expertise has served as a resource for the university community and collaborators in many domains. MITH also provides some teaching and hosts events for campus and public communities in support of its core research mission.</p>
      </section>
      <section className="col-12">The MITH website is being redeveloped in public. If you are looking for content that was previously here, it's in <a href="#">the archive</a>.</section>
    </div>
  </Layout>
)

export default IndexPage
