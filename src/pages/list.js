// @format
import React from 'react'

import Layout from '../components/layout'
import Booth from '../components/booth'

import '../components/booth.css'

const IndexPage = () => (
  <Layout>
    <Booth market="Rathaus" name="Gustavs Glühweinstand " tags={[
    'Süffiger Glühwein', 'Bio', 'Fair Trade' ]} />
    <Booth market="Kiepenkerl" name="Franks Frittenbude" tags={[
    'Belgische Pommes', 'ordentlich Soße' ]} />
    <Booth market="Überwasserkirche" name="Wolles Wollshop" tags={[
    'Feine Wolle aus der Normandie', 'fair gehandelt', 'Merino' ]} />
  </Layout>
)

export default IndexPage
