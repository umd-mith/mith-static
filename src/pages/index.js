import React from 'react'
//import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="page-home columns">
      <section className="leader">
        <h1>Home</h1>
        <p>[intro text can go here]</p>
      </section>
      <section className="col-2 col-2-lg col-2-md col-2-sm col-1-xs">
          <h2>Subheader</h2>
          <p>[paragraph text]</p>
      </section>
      <section className="col-2 col-2-lg col-2-md col-2-sm col-1-xs">
          <h2>Subheader</h2>
          <p>[paragraph text]</p>
      </section>
    </div>
  </Layout>
)

export default IndexPage
