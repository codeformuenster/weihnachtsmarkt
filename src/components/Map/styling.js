export const boothStyle = {
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
  ],
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

// console.log(this.props.filterData)
// this.map = this.themap == undefined ? null : this.themap.getMap()
// if (this.props.filterData.length !== 0 && this.map != null) {
//   this.map.getSource('booths-source').setData({
//     type: 'FeatureCollection',
//     features: this.props.allBooths.map(e => ({
//       ...e,
//       type: 'Feature',
//       properties: {
//         ...e,
//         filterVisible: this.props.filterData.includes(e.id) ? 1 : 0,
//       },
//     })),
//   })
//   this.map.setPaintProperty('booths', 'fill-extrusion-color', [
//     'case',
//     // if filterVisible == 0
//     //color depending on type
//     ['==', ['get', 'filterVisible'], 0],
//     'grey',
//     // [
//     //   'match',
//     //   ['get', 'type'],
//     //   'beverage',
//     //   '#bda4bb',
//     //   'craft',
//     //   '#c8dbe4',
//     //   'food',
//     //   '#d8babb',
//     //   'clothes',
//     //   '#aac3c0',
//     //   'candy',
//     //   '#fdfae8',
//     //   /* other */ '#ccc',
//     // ],
//     // else
//     //color white
//     ['==', ['get', 'filterVisible'], 1],
//     'red',
//     // [
//     //   'match',
//     //   ['get', 'type'],
//     //   'beverage',
//     //   '#390035',
//     //   'craft',
//     //   '#0097df',
//     //   'food',
//     //   '#db5f62',
//     //   'clothes',
//     //   '#00D1B2',
//     //   'candy',
//     //   '#ffde2d',
//     //   /* other */ '#ccc',
//     // ],
//     // default
//     // color white
//     '#ffffff',
//     // {
//     //   property: 'filterVisible',
//     //   stops: [[0, '#F60000'], [1, '#00FFFF']],
//     // },
//   ])
// } else {
//   if (this.map != null) {
//     if (this.map.getSource('booths-source') != null) {
//       this.map.getSource('booths-source').setData({
//         type: 'FeatureCollection',
//         features: this.props.allBooths.map(e => ({
//           ...e,
//           type: 'Feature',
//           properties: {
//             ...e,
//             filterVisible: 0,
//           },
//         })),
//       })
//       // set default styling
//       this.map.setPaintProperty('booths', 'fill-extrusion-color', [
//         'case',
//         // if filterVisible == 0
//         //color depending on type
//         ['==', ['get', 'filterVisible'], 0],
//         [
//           'match',
//           ['get', 'type'],
//           'beverage',
//           '#390035',
//           'craft',
//           '#0097df',
//           'food',
//           '#db5f62',
//           'clothes',
//           '#00D1B2',
//           'candy',
//           '#ffde2d',
//           /* other */ '#ccc',
//         ],
//         // else
//         //color white
//         ['==', ['get', 'filterVisible'], 1],
//         '#ffffff',
//         // default
//         // color white
//         '#ffffff',
//         // {
//         //   property: 'filterVisible',
//         //   stops: [[0, '#F60000'], [1, '#00FFFF']],
//         // },
//       ])
//     }
//   }
// }
