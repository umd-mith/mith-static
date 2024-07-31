import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Nav from "./nav"
import Footer from "./footer"
import "./layout.css"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
const { fas } = require("@fortawesome/free-solid-svg-icons")

// add just what we need from font-awesome

library.add(
  fab.faTwitter,
  fas.faEnvelope,
  fas.faMobileAlt,
  fas.faBars,
  fas.faGlobe,
  fas.faCalendar,
  fas.faCalendarAlt,
  fas.faClock,
  fas.faMapMarker,
  fas.faMapMarkerAlt,
  fas.faRss,
  fas.faPlayCircle,
  fas.faPlay,
)

interface LayoutProps {
  children: JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="outerWrapper">
        <Header />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
