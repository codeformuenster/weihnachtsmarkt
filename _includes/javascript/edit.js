// taken from http://leaflet.github.io/Leaflet.Editable/example/index.html
var _EditControl = L.Control.extend({
  options: {
    position: 'topleft',
    callback: null,
    kind: '',
    html: ''
  },
  _disabled: false,
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
      link = L.DomUtil.create('a', '', container);

    link.href = '#';
    link.title = this.options.title;
    link.innerHTML = this.options.html;
    L.DomEvent.on(link, 'click', L.DomEvent.stop)
              .on(link, 'click', function () {
                if (!this._disabled) {
                  this.disable();

                  window.LAYER = this.options.callback.call(map.editTools);
                }
              }, this);
    return container;
  },
  disable: function () {
    this._disabled = true;
  },
  enable: function () {
    this._disabled = false;
  }
});

window.NEXT_CLICK_ENABLES_EDIT = false;

L.extend(window.Weihnachtsmarkt, {
  _enableSelectStandMode: function () {
    if (!window.IN_EDIT_MODE) {
      this._startNewStandControl.disable();
      this._resetSearchResultDisplay();

      L.DomUtil.get('initialSearchResultView').textContent = 'Jetzt einen Stand durch klicken auswählen';

      window.NEXT_CLICK_ENABLES_EDIT = true;
      // tell the user to select a feature
    }
  },
  _enableEditingForLayer: function (layer) {
    this._map.fitBounds(layer.getBounds());
    layer.enableEdit();
    showNodeById('editingFields');
    hideNodeById('searchResult');
    L.DomUtil.get('editTitle').value = layer.feature.properties.betreiber;
    console.log(layer.feature.properties);
    //if (layer.feature.properties.warenangeb

    window.IN_EDIT_MODE = true;
  },
  _enableEditingControls: function (map) {
    if (!L.Browser.mobile) {
      this._map = map;
      // Edit control
      this._editControl = new _EditControl({
        title: 'Stand bearbeiten',
        html: '&#9998;',
        callback: this._enableSelectStandMode.bind(this)
      });
      this._map.addControl(this._editControl);
      // add stand control
      this._startNewStandControl = new _EditControl({
        title: 'Stand hinzufügen',
        html: '&#10033;',
        callback: this._map.editTools.startPolygon
      });
      this._map.addControl(this._startNewStandControl);
    }
  }
});
