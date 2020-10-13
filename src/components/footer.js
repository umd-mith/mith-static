import React from 'react'

import Nav from './nav'

import './footer.css'

class Footer extends React.Component {
  render() {
    return( 
      <footer className="footer main-footer">
        <Nav className="container" />
        <div className="footer-bar container">
          <div className="copyright">
            Unless otherwise noted, this site and its contents are copyright &copy; 2005 &ndash; {new Date().getFullYear()} Maryland Institute for Technology in the Humanities and licensed under a <a href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>. &nbsp;|&nbsp; <a href="https://umd.edu/web-accessibility">Web Accessibility</a> &nbsp;|&nbsp; <a href="https://umd.edu/privacy-notice">Privacy Notice</a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer