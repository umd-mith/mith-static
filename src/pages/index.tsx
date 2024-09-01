import { Link } from "gatsby"
import React from "react"
//import { Link } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <section className="leader">
        <p>
          We are an interdisciplinary group of researchers who collaboratively
          advance the study of cultural heritage and arts using computational
          technologies while also training the insights and approaches of the
          humanities on the computational technologies that shape our world.
        </p>
        <p>
          As a center within the College of Arts and Humanities at the
          University of Maryland, College Park, MITH has served as a world-class
          concentration of expertise for more than 20 years. We also teach
          courses and hosts events for campus and public communities in support
          of our core research mission.
        </p>
        <p>
          You might know us through our work on the{" "}
          <a href="https://www.unlockingtheairwaves.org/">
            Unlocking the Airwaves
          </a>{" "}
          project, on the{" "}
          <a href="http://shelleygodwinarchive.org/">Shelley-Godwin Archive</a>,
          with <a href="https://aadhum.umd.edu/">AADHum</a> (African American
          Digital and Experimental Humanities @ UMD), or through some of the
          other work of our <Link to="/people/">faculty and staff members</Link>
          .
        </p>
        <p>
          The MITH website is currently being redeveloped in public. If you are
          looking for content that was previously here, it's in{" "}
          <a href="https://archive.mith.umd.edu/mith-2020/">the archive</a>.
        </p>
      </section>
    </div>
  </Layout>
)

export default IndexPage
