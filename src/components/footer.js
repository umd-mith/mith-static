import { Link } from 'gatsby'
import React from 'react'

import './footer.css'

class Footer extends React.Component {
  render() {
    return( 
      <footer>
        <div className="footer-bar">
          <div className="copyright">
            Unless otherwise noted, this site and its contents are copyright &copy; 2005 &ndash; {new Date().getFullYear()} Maryland Institute for Technology in the Humanities and licensed under a <Link to="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</Link>. &nbsp;|&nbsp; <Link to="https://umd.edu/web-accessibility">Web Accessibility</Link> &nbsp;|&nbsp; <Link to="https://umd.edu/privacy-notice">Privacy Notice</Link>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer