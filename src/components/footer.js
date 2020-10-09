import { Link } from 'gatsby'
import React from 'react'

import './footer.css'

class Footer extends React.Component {
  render() {
    return( 
      <footer>
        <div className="footer-bar">
          <div className="copyright">
            Copyright &copy; 2015 &ndash; {new Date().getFullYear()} Maryland Institute for Technology in the Humanities &nbsp;|&nbsp; All Rights Reserved &nbsp;|&nbsp; <Link to="https://umd.edu/web-accessibility">Web Accessibility</Link> &nbsp;|&nbsp; <Link to="https://umd.edu/privacy-notice">Privacy Notice</Link>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer