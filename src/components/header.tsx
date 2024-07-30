import { Link } from "gatsby"
import React from "react"

import "./header.css"
import Logo from "../svg/MITH-logostack-blk.svg"

const Header = () => (
  // siteTitle currently unused.
  <header>
    <div className="logo">
      <Link to="/">
        <Logo />
      </Link>
    </div>
  </header>
)

export default Header
