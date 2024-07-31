import { Link } from 'gatsby'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import './nav.css'

interface NavLink {
  link: string
  name: string
}

const Nav = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          navLinks {
            name
            link
          }
        }
      }
    }
  `)

  return(
    <nav>
      <ul className="navbar">
        {data.site.siteMetadata.navLinks.map((link: NavLink) => (
          <li key={link.name} >
            <Link activeClassName="active" to={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
