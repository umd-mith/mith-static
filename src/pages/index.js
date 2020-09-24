import React from "react"
//import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="page-home">
      <section className="leader">
          <h1>Home</h1>
          <p>Content TBD</p>
      </section>
    </div>
  </Layout>
)

export default IndexPage
