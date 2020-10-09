import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header' 
import Footer from './footer'
import './layout.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEnvelope, faTwitter, faMobileAlt)

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="content">
        {children}
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
