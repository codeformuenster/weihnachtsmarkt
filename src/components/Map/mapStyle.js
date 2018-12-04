import { fromJS } from 'immutable'
const MAP_STYLE = 'mapbox://styles/felixaetem/cjmwkrak403hr2snrjunbuvze'

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const boothLayer = fromJS({
  id: 'booths',
  type: 'fill-extrusion',
  source: 'booths-source',
  layout: {},
  minzoom: 13,
  paint: {
    'fill-extrusion-color': [
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
        'clothes',
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
    ],
    'fill-extrusion-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      13,
      0,
      16,
      1,
    ],
    'fill-extrusion-height': 3,
    // 'fill-extrusion-opacity': 0.5,
  },
})

export const defaultMapStyle = fromJS(MAP_STYLE)
