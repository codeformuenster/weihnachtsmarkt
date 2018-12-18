export const defaultBoothColors = [
  'match',
  ['get', 'type'],
  'Ausschank',
  '#390035',
  'Dekoration',
  '#0097df',
  'food',
  '#db5f62',
  'Herzhaftes',
  '#db5f62',
  'Delikatessen & feine Köstlichkeiten als Geschenkartikel',
  '#db5f62',
  'Textilien',
  '#00D1B2',
  'Süßes',
  '#ffde2d',
  'Kinder',
  '#ff9966',
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
