import { Link } from 'gatsby'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import './nav.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <nav className="nav-bar">
      <ul>
        {data.site.siteMetadata.navLinks.map(link=> (
          <li
            key={link.name}
          >
          <Link activeClassName="active" to={link.link}>{link.name}</Link>
        </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav