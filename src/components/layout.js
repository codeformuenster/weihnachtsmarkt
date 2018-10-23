import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import ConnectedSearch from '../containers/Search/Search'

import Footer from './footer'
import 'normalize.css'
import './layout.css'

const Layout = ({ children, layout = 'list' }) => {
  const classes = `layout-grid ${layout}-layout`
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              longTitle
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {
                name: 'description',
                content: data.site.siteMetadata.longTitle,
              },
              {
                name: 'keywords',
                content:
                  'weihnachtsmarkt.ms, weihnachtsmarkt, christmas market',
              },
              { name: 'mobile-web-app-capable', content: 'yes' },
              { name: 'apple-mobile-web-app-capable', content: 'yes' },
              {
                name: 'apple-mobile-web-app-title',
                content: data.site.siteMetadata.title,
              },
            ]}
          >
            <html lang="de" />
          </Helmet>
          <div className={classes}>
            <div className="main-container">{children}</div>
            {layout !== 'hidden-search' && (
              <div className="searchbox-container">
                <ConnectedSearch />
              </div>
            )}
            <div className="footer-container">
              <Footer />
            </div>
          </div>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.node.isRequired,
}

export default Layout
