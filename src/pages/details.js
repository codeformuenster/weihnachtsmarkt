import React from 'react'

import Details from '../components/Details/Details'
import Layout from '../components/layout'

const DetailsPage = () => (
  <Layout>
    <Details
      name={'Wiesn Bratwurst & mehr'}
      tags={['Leibliches Wohl', 'Unterhaltung']}
      description={
        'Beim "Wiesn Bratwurst & mehr" bekommt man die volle Dröhnung! Leckere bayerische Spezialitäten zu zünftiger Wiesn Musik vom Live Act \\"Die Wiesn-Boys\\". Die Tradition verpflichtet und wichtige Dinge werden nicht außer Acht gelassen. Für das leibliche Wohl ist gesorgt und keine Auge bleibt trocken. O\'zapft is!'
      }
    />
  </Layout>
)

export default DetailsPage
