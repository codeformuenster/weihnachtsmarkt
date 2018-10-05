// @format
import React from 'react'

import Layout from '../components/layout'
import ConnectedBooth from '../containers/List/Booth'
import Search from '../components/search'

import './list.css'
import '../components/List/Booth.css'

const ListPage = () => (
  <Layout>
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        backgroundColor: '#343332',
      }}
    >
      <Search />
    </div>
    <div className="booths">
      <ConnectedBooth
        market="Rathaus"
        name="Gustavs Glühweinstand "
        tags={['Süffiger Glühwein', 'Bio', 'Fair Trade']}
        odd={false}
        type="beverage"
      />
      <ConnectedBooth
        market="Kiepenkerl"
        name="Franks Frittenbude"
        tags={['Belgische Pommes', 'ordentlich Soße']}
        odd={true}
        type="food"
      />
      <ConnectedBooth
        market="Überwasserkirche"
        name="Wolles Wollshop"
        tags={['Feine Wolle aus der Normandie', 'fair gehandelt', 'Merino']}
        odd={false}
        type="clothes"
      />
      <ConnectedBooth
        market="Kiepenkerl"
        name="Peter Panflötenreich"
        tags={['Holzschnitzereien', 'Musikinstrumente', 'Esoterik']}
        odd={true}
        type="craft"
      />
      <ConnectedBooth
        market="Rathaus"
        name="Bernds Bretterbude"
        tags={['Holzschnitzereien', 'Kaltgetränke']}
        odd={false}
        type="craft"
      />
      <ConnectedBooth
        market="Rathaus"
        name="Franz Feuzerzangenbowlen- und Glühweinstand"
        tags={['Holzschnitzereien', 'Kaltgetränke']}
        odd={true}
        type="beverage"
      />
      <ConnectedBooth
        market="Lamberti"
        name="Tolle Wolle von Frau Holle"
        tags={['Wollware', 'Handschuhe', 'Fleece']}
        odd={false}
        type="clothes"
      />
    </div>
  </Layout>
)

export default ListPage
