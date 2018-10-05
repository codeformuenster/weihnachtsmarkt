import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Map from '../components/map'

import './index.css'

const IndexPage = () => {
  return (
  <Layout>
    <div className='grid'>
      <h1>Hi people</h1>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>
      <p className='ueberall'>Das ist breit</p>
      <p className='mitte-unten'>Das ist mitte unten</p>

    </div>
  </Layout>
  )
}

export default IndexPage
