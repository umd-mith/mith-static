import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.css"
import Logo from "../svg/MITH-logostack-wht.svg"

class Header extends React.Component {
  render() {
    return (
      <header className="main-head">
        <div className="logo-bar">
          <Link className="logo" to="/">
            <Logo />
          </Link>
        </div>
        <div className="nav-bar">
          <nav className="main-nav">
            <ul className="main-nav-menu">
              <li className="menu-who-we-are has-children">
                <Link activeClassName="active" to="/who-we-are/" aria-haspopup="true">Who We Are</Link>
                <ul className="sub-menu">
                  <li className="menu-item menu-values"><Link activeClassName="active" to="/who-we-are/values/">Our Values</Link></li>
                  <li className="menu-item menu-research"><Link activeClassName="active" to="/research/">Our Research</Link></li>
                </ul>
              </li>
              <li className="menu-opportunities has-children">
                <Link activeClassName="active" to="/opportunities/" aria-haspopup="true">Opportunities for Students</Link>
                <ul className="sub-menu">
                  <li className="menu-item menu-internships"><Link activeClassName="active" to="/opportunities/internships/">Internships</Link></li>
                  <li className="menu-item menu-fellowships"><Link activeClassName="active" to="/opportunities/fellowships/">Fellowships</Link></li>
                  <li className="menu-item menu-writing-group"><Link activeClassName="active" to="/opportunities/writing-group/">Writing Group</Link></li>
                  <li className="menu-item menu-curricula"><Link activeClassName="active" to="/opportunities/curricula/">Courses</Link></li>
                </ul>
              </li>
              <li className="menu-events has-children">
                <Link activeClassName="active" to="/events/" aria-haspopup="true">Events</Link>
                <ul className="sub-menu">
                  <li className="menu-item menu-digital-dialogues"><Link activeClassName="active" to="/digital-dialogues/">Digital Dialogues</Link></li>
                  <li className="menu-item menu-other-events hidden"><Link activeClassName="active" to="/events/other">Other Events</Link></li>
                </ul>
              </li>
              <li className="menu-blog">
                <Link activeClassName="active" to="/news/">News</Link>
              </li>
              <li className="menu-people has-children">
                <Link activeClassName="active" to="/people/" aria-haspopup="true">People</Link>
                <ul className="sub-menu">
                  <li className="menu-item menu-people-current"><Link activeClassName="active" to="people/">Current Staff</Link></li>
                  <li className="menu-item menu-people-past"><Link activeClassName="active" to="/people/people-past">Past Staff</Link></li>
                </ul>
              </li>            
              <li className="menu-partner">
                <Link activeClassName="active" to="/blog/">Partner with Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
