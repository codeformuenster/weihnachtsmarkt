import React from 'react'
import { Link } from 'gatsby'

import './footer.css'

const Footer = () => (
  <React.Fragment>
    <Link className="footer-link" to="/">
      <i className="material-icons">map</i>
    </Link>
    <Link className="footer-link" to="/list">
      <i className="material-icons">list</i>
    </Link>
    <Link className="footer-link" to="/info">
      <i className="material-icons">info</i>
    </Link>
  </React.Fragment>
)

export default Footer
