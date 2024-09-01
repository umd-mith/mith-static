import { Link } from "gatsby"
import React from "react"

import Logo from "../svg/MITH-logostack-blk.svg"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => (
  // siteTitle currently unused.
  <header>
    <div className="bg-white flex flex-row items-center justify-center py-4">
      <Link to="/">
        <Logo height="8rem" />
      </Link>
    </div>
    <div className="h-96 overflow-hidden absolute top-0 left-0 w-full -z-10">
      <StaticImage
        src="../images/mith-pattern-header.png"
        alt="Header Pattern"
        layout="fullWidth"
        className="no-repeat object-cover align-middle"
        placeholder="blurred"
      />
    </div>
  </header>
)

export default Header
