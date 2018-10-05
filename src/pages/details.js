import React from 'react'

import Details from '../components/Details/Details'
import Layout from '../components/layout'

const DetailsPage = (name, tags, description) => (
  <Layout>
    <Details name={name} tags={tags} description={description} />
  </Layout>
)

export default DetailsPage
