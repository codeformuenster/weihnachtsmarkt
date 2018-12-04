import React from 'react'

import './Legend.css'

const boothStyling = [
  {
    type: 'beverage',
    color: '#390035',
  },
  {
    type: 'craft',
    color: '#0097df',
  },
  {
    type: 'food',
    color: '#db5f62',
  },
  {
    type: 'clothes',
    color: '#00D1B2',
  },
  {
    type: 'candy',
    color: '#ffde2d',
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
