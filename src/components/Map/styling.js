export const defaultBoothColors = [
  'case',
  // if filterVisible == 0
  //color depending on type
  ['==', ['get', 'filterVisible'], 0],
  [
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
  ],
  // else
  //color white
  ['==', ['get', 'filterVisible'], 1],
  '#ffffff',
  // default
  // color white
  '#ffffff',
  // {
  //   property: 'filterVisible',
  //   stops: [[0, '#F60000'], [1, '#00FFFF']],
  // },
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
  // if filterVisible == 0
  //color depending on type
  ['==', ['get', 'filterVisible'], 0],
  'grey',
  // [
  //   'match',
  //   ['get', 'type'],
  //   'beverage',
  //   '#bda4bb',
  //   'craft',
  //   '#c8dbe4',
  //   'food',
  //   '#d8babb',
  //   'clothes',
  //   '#aac3c0',
  //   'candy',
  //   '#fdfae8',
  //   /* other */ '#ccc',
  // ],
  // else
  //color white
  ['==', ['get', 'filterVisible'], 1],
  'red',
  // [
  //   'match',
  //   ['get', 'type'],
  //   'beverage',
  //   '#390035',
  //   'craft',
  //   '#0097df',
  //   'food',
  //   '#db5f62',
  //   'clothes',
  //   '#00D1B2',
  //   'candy',
  //   '#ffde2d',
  //   /* other */ '#ccc',
  // ],
  // default
  // color white
  '#ffffff',
  // {
  //   property: 'filterVisible',
  //   stops: [[0, '#F60000'], [1, '#00FFFF']],
  // },
]
