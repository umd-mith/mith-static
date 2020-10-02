import React from "react"
import { Link } from 'gatsby';

import Layout from "../components/layout"
import SEO from "../components/seo"

const WritingGroupPage = () => (
  <Layout>
    <SEO title="Writing Group" />
    <div className="page-writing-group">
      <section className="leader">
        <h1>Writing Group</h1>
        <p>The Writing Group is sponsored by the <Link to="https://mith.umd.edu" title="Maryland Institute for Technology in the Humanities (MITH">Maryland Institute for Technology in the Humanities (MITH)</Link> and the <Link to="https://dsah.umd.edu" title="Digital Studies in the Arts and Humanities (DSAH)">Digital Studies in the Arts and Humanities (DSAH)</Link> graduate certificate program. UMD faculty, graduate and undergraduate students as well as members of the public are welcome to attend. For more information please email one (or both) of the group coordinators: <Link to="mailto:purdom@umd.edu">Purdom Lindblad</Link> or <Link to="setsuko@umd.edu">Setsuko Yokoyama</Link>.</p>
      </section>
    </div>
  </Layout>
)

export default WritingGroupPage
