import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header' 
import Footer from './footer'
import './layout.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMobileAlt, faBars } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEnvelope, faTwitter, faMobileAlt, faBars)

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
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="outerWrapper">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
