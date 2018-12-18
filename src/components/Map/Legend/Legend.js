import React from 'react'

import './Legend.css'

const boothStyling = [
  {
    type: 'Getränke',
    color: '#390035',
  },
  {
    type: 'Dekoration',
    color: '#0097df',
  },
  {
    type: 'Essen',
    color: '#db5f62',
  },
  {
    type: 'Kleidung',
    color: '#00D1B2',
  },
  {
    type: 'Süßes',
    color: '#ffde2d',
  },
  {
    type: 'Kinder',
    color: '#ff9966',
  },
]

const Legend = () => (
  <div className="legend">
    {boothStyling.map((e, i) => (
      <div key={i}>
        <span
          className="legend-color"
          style={{
            backgroundColor: e.color,
          }}
        />
        <span>{e.type}</span>
      </div>
    ))}
  </div>
)

export default Legend
