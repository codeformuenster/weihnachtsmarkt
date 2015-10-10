L.extend(window.Weihnachtsmarkt, {
  _staendeStyleFilterFunction: function (layer) {
    var styleToApply = this._staendeStyles.normal;
    var searchString = this._currentSearchString;
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
        this._addLayerToResultList(layer);
      } else {
        styleToApply = this._staendeStyles.low;
      }
    }
    return styleToApply;
  },
  _highlightResult: function (result) {
    this._highlightLayer.clearLayers();
    if (result) {
      this._highlightLayer.addData(result);
    }
  },
  _initMap: function () {
    var map = L.map("map",{
      center: [51.96144, 7.6292],
      zoom: 18,
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
      },
      result: {
        color: "#F57F06",
        weight: 2,
        opacity: 1,
        fillOpacity: 1
      }
    };

    L.tileLayer("http://{s}.tiles.mapbox.com/v3/tomrocket.k93e7pp4/{z}/{x}/{y}.png", {
      maxZoom: 22
    }).addTo(map);

    this._staendeLayer = L.geoJson(this._rawdata,{
      style: this._staendeStyleFilterFunction.bind(this)
    }).addTo(map);

    this._highlightLayer = L.geoJson({type:"FeatureCollection",features:[]}, {
      style: this._staendeStyles.result
    }).addTo(map);

    this._map = map;
  }
});
