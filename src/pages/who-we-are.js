import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const WhoWeArePage = () => (
  <Layout>
    <SEO title="Who We Are" />
    <div className="page-who-we-are">
        <section className="leader">
          <h1>Who We Are</h1>
          <p>Intro text</p>
        </section>
        <section>
          <p>[other text here]</p>
        </section>
    </div>
  </Layout>
)

export default WhoWeArePage
