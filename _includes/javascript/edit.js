// taken from http://leaflet.github.io/Leaflet.Editable/example/index.html
var _EditControl = L.Control.extend({
  options: {
    position: 'topleft',
    callback: null,
    kind: '',
    html: ''
  },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
      link = L.DomUtil.create('a', '', container);

    link.href = '#';
    link.title = this.options.title;
    link.innerHTML = this.options.html;
    L.DomEvent.on(link, 'click', L.DomEvent.stop)
              .on(link, 'click', function () {
                window.LAYER = this.options.callback.call(map.editTools);
              }, this);

    return container;
  }
})

window.NEXT_CLICK_ENABLES_EDIT = false;

L.extend(window.Weihnachtsmarkt, {
  _enableSelectStandMode: function () {
    window.NEXT_CLICK_ENABLES_EDIT = true;
    // tell the user to select a feature
  },
  _enableEditingForLayer: function (layer) {
    this._map.fitBounds(layer.getBounds());
    layer.enableEdit();
  },
  _enableEditingControls: function (map) {
    if (!L.Browser.mobile) {
      this._map = map;
      // Edit control
      this._map.addControl(new _EditControl({
        title: 'Stand bearbeiten',
        html: '&#9998;',
        callback: this._enableSelectStandMode.bind(this)
      }));
      // add stand control
      this._map.addControl(new _EditControl({
        title: 'Stand hinzufügen',
        html: '&#9998;',
        callback: this._enableSelectStandMode.bind(this)
      }));
    }
  }
});
