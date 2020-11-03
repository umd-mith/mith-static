import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Nav from './nav'
import './header.css'
import Logo from '../svg/MITH-logostack-blk.svg'

class Header extends React.Component {
  render() {
    return (
        <div>
          <Link className="logo" to="/">
      <header>
            <Logo />
          </Link>
        </div>
        <Nav/>
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
