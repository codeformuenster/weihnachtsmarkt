import React from 'react'

import Layout from '../components/layout'
import './info.css'

const SecondPage = () => (
  <Layout layout="hidden-search">
    <div
      style={{
        color: '#EEEEEE',
      }}
    >
      <h2 className="info-text" >Weihnachtsmärkte in Münster</h2>
      <p className="info-text">
        Jedes Jahr, eine Woche vor dem ersten Advent, beginnen die fünf
        Weihnachtsmärkte in Münster. Die über 300 Buden laden Besucher und
        Interessierte zum Bummeln, Einkauen und Genießen ein.
      </p>
      <p className="info-text">
        Auf der{' '}
        <a
          href="https://www.stadt-muenster.de/weihnachtsmarkt/startseite.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          offiziellen Webseite der Stadt Münster
        </a>{' '}
        finden sich noch weitere wichtige Informationen rund um die
        Weihnachtsmärkte in Münster.
      </p>
      <p className="info-text">
        Diese <strong>unauthorisierte</strong> Übersichtsseite der münsteraner
        Weihnachtsmärkte wurde im Rahmen des Münsterhack 2018 von{' '}
        <a
          href="https://codeformuenster.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code for Münster
        </a>{' '}
        erstellt. Der{' '}
        <a
          href="https://github.com/codeformuenster/weihnachtsmarkt"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code
        </a>{' '}
        ist unter einer freien Lizenz verfügbar.
      </p>
      <p className="info-text">
        <strong>
          Die enthaltenen Daten entsprechen nicht unbedingt der Realität.
        </strong>
      </p>
      <p className="info-text">
        Von rechtlichen Schritten bitten wir abzusehen.
      </p>
    </div>
  </Layout>
)

export default SecondPage
