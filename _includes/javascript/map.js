L.extend(window.Weihnachtsmarkt, {
  _staendeStyleFunction: function (layer) {
    var styleToApply = this._staendeStyles.normal;
    var searchString = this._getSearchString();
    if (searchString !== "") {
      var layerProperties = layer.properties;
      var compareRegex = RegExp(searchString, 'i');
      if (this._searchableProperties.some(function (prop) {
        if (L.Util.isArray(layerProperties[prop])) {
          return layerProperties[prop].some(function (p) {
            return compareRegex.test(p);
          });
        } else {
          return compareRegex.test(layerProperties[prop]);
        }
      })) {
        styleToApply = this._staendeStyles.high;
      } else {
        styleToApply = this._staendeStyles.low;
      }
    }
    return styleToApply;
  },
  _initMap: function () {
    var map = L.map("map",{
      center: [51.96255, 7.62547],
      zoom: 17,
      attributionControl: false
    });

    this._staendeStyles = {
      normal: {
        color: "#f8f8f8",
        weight: 0,
        opacity: 1,
        fillOpacity: 0.8
      },
      high: {
        color: "#ff3322",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      },
      low: {
        color: "#B8BCC8",
        weight: 0,
        opacity: 0.5,
        fillOpacity: 0.5
      }
    };

    L.tileLayer("http://{s}.tiles.mapbox.com/v3/tomrocket.k93e7pp4/{z}/{x}/{y}.png", {
      maxZoom: 22
    }).addTo(map);

    this._staendeLayer = L.geoJson(this._rawdata,{
      style: this._staendeStyleFunction.bind(this)
    }).addTo(map);

    this._map = map;
  }
});
