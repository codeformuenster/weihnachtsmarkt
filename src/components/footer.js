import React from 'react'
import { Link } from 'gatsby'
import './footer.css'

const Footer = ({ siteTitle }) => (
  <div
    style={{
      background: '#0C192E',
      marginBottom: '0rem',
      height: '80px'
    }}
  >
    <div
      className='footer'
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <p style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <i className="material-icons">
            map
          </i>
        </Link>
      </p>
      <p style={{ margin: 0 }}>
        <Link
          to="/page-2"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          <i className="material-icons">
            list
          </i>
        </Link>
      </p>
      <p style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {/* {siteTitle} */}
          <i className="material-icons">
            info
          </i>
        </Link>
      </p>
    </div>
  </div>
)

export default Footer
