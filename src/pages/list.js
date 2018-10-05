// @format
import React from 'react'

import Layout from '../components/layout'
import Booth from '../components/booth'
import Search from '../components/search'

import './list.css'
import '../components/booth.css'

const ListPage = () => (
  <Layout>
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
      }}
    >
      <Search />
    </div>
    <div className="booths">
      <Booth
        market="Rathaus"
        name="Gustavs Glühweinstand "
        tags={['Süffiger Glühwein', 'Bio', 'Fair Trade']}
      />
      <Booth
        market="Kiepenkerl"
        name="Franks Frittenbude"
        tags={['Belgische Pommes', 'ordentlich Soße']}
      />
      <Booth
        market="Überwasserkirche"
        name="Wolles Wollshop"
        tags={['Feine Wolle aus der Normandie', 'fair gehandelt', 'Merino']}
      />
      <Booth
        market="Kiepenkerl"
        name="Peter Panflötenreich"
        tags={['Holzschnitzereien', 'Musikinstrumente', 'Esoterik']}
      />
      <Booth
        market="Rathaus"
        name="Bernds Bretterbude"
        tags={['Holzschnitzereien', 'Kaltgetränke']}
      />
      <Booth
        market="Rathaus"
        name="Franz Feuzerzangenbowlen- und Glühweinstand"
        tags={['Holzschnitzereien', 'Kaltgetränke']}
      />
      <Booth
        market="Lamberti"
        name="Tolle Wolle von Frau Holle"
        tags={['Wollware', 'Handschuhe', 'Fließ']}
      />
    </div>
  </Layout>
)

export default ListPage
