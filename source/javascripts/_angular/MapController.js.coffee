angular.module("wm-map").controller "MapController", [
  "$scope",
  "leafletData",
  "searchService",
  "staendeService",
  "$timeout"
  ($scope, leafletData, searchService, staendeService, $timeout) ->
    loStyle =
      color: "#f8f8f8"
      weight: 1
      opacity: 1
      fillOpacity: 0.8
    hiStyle =
      color: "#ff3322"
      weight: 2
      opacity: 1
    highlightFeature = (e) ->
      #this.openPopup();
      layer = e.target
      layer.setStyle hiStyle
    resetHighlight = (e) ->
      #this.closePopup();
      layer = e.target
      layer.setStyle loStyle
    # set up basic stuff
    angular.extend $scope,
      muenster:
        lat: 51.96255
        lng: 7.62547
        zoom: 17
      defaults:
        minZoom: 16
        maxZoom: 22
        attributionControl: false
      tiles:
          url: 'http://{s}.tiles.mapbox.com/v3/tomrocket.k93e7pp4/{z}/{x}/{y}.png'
          options:
            maxZoom: 22
      search_query: ''
      geojson:
        style: loStyle
        data: { type: "FeatureCollection", features: [] }
        onEachFeature: (feature, layer) ->
          layer.on
            mouseover: highlightFeature
            mouseout: resetHighlight

          layer.bindPopup "Stand Nr. " + feature.properties.stand_nr + "<br /><b>" + feature.properties.betreiber + "</b><br /><i>" + feature.properties.warenangeb + "</i>"

          return
      updateGeoJSONFromData: (featureCollection, includeChildren, focusFeatures) ->
        # Update the scope
        if !angular.equals($scope.geojson.data, featureCollection)
          $scope.geojson =
            style: $scope.geojson.style
            onEachFeature: $scope.geojson.onEachFeature
            pointToLayer: $scope.geojson.pointToLayer
            data: featureCollection

          $timeout ->
            leafletData.getMap('map').then (map) ->
              bounds = L.geoJson($scope.geojson.data).getBounds()
              map.fitBounds(bounds, { maxZoom: 21, padding: [55,55]}) if Object.keys(bounds).length isnt 0
              return
            return
          ,700
          ,false

        return
      setMarktFilter: (markt) ->
        searchService.setFilter { markt: markt }
        return

    applyQuery = (value, oldvalue, scope) ->
      query = $scope.search_query.trim()
      searchService.setFilter { query: query }
      return

    $scope.$watch 'search_query', applyQuery

    # fetch the data, broadcasts map.updateFeatures event
    staendeService.fetchData()

    $scope.$on 'map.updateFeatures', (evt, data) ->
      $scope.updateGeoJSONFromData(data)
      return


    return
]