export const defaultBoothColors = [
  'match',
  ['get', 'type'],
  'beverage',
  '#390035',
  'craft',
  '#0097df',
  'food',
  '#db5f62',
  'Textilien', // clothes
  '#00D1B2',
  'candy',
  '#ffde2d',
  /* other */ '#ccc',
]

export const boothStyle = {
  'fill-extrusion-color': defaultBoothColors,
  'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0, 16, 1],
  'fill-extrusion-height': 3,
  // 'fill-extrusion-opacity': 0.5,
}

export const marketStyle = {
  'fill-color': '#747474',
  'fill-opacity': [
    'interpolate',
    ['linear'],
    ['zoom'],
    12,
    0.8,
    16,
    0.6,
    18,
    0,
  ],
}

export const filterBoothStyle = [
  'case',
  ['==', ['get', 'filterVisible'], 0],
  'grey',
  ['==', ['get', 'filterVisible'], 1],
  'red',
  '#ffffff',
]
