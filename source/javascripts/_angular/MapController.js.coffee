angular.module("wm-map").controller "MapController", [
  "$scope",
  "leafletData",
  "searchService",
  "staendeService",
  "$timeout"
  ($scope, leafletData, searchService, staendeService, $timeout) ->
    loStyle =
      color: "#f8f8f8"
      weight: 0
      opacity: 1
      fillOpacity: 0.8
    hiStyle =
      color: "#ff3322"
      weight: 1
      opacity: 1
    highlightFeature = (e) ->
      #this.openPopup();
      layer = e.target
      layer.setStyle hiStyle
      return
    resetHighlight = (e) ->
      #this.closePopup();
      layer = e.target
      layer.setStyle loStyle
      return
    highlightQuery = (e) ->
      if searchService._query != ""
        content = e.popup.getContent()
        # transform the content
        content = content.replace RegExp(searchService._query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "gi"), (match) ->
            return "<span class='popupHighlight'>#{match}</span>"
        , "gi"
        e.popup.setContent(content)
      return
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
            popupopen: highlightQuery

          popupContent = "#{feature.properties.markt.charAt(0).toUpperCase() + feature.properties.markt.slice(1)} Stand Nr. #{feature.properties.stand_nr}"
          if feature.properties.warenangeb != null
             popupContent = "#{popupContent}<br />#{feature.properties.warenangeb}"
          if feature.properties.betreiber != null
            popupContent = "#{popupContent}<br />#{feature.properties.betreiber}"

          layer.bindPopup popupContent

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

    focusInput = (value) ->
      if value == false
        document.getElementById('search_input').focus()
      return

    $scope.$watch 'search_query', applyQuery
    $scope.$watch 'show_info', focusInput
    $scope.$watch 'show_welcome', focusInput

    # fetch the data, broadcasts map.updateFeatures event
    staendeService.fetchData()

    $scope.$on 'map.updateFeatures', (evt, data) ->
      $scope.updateGeoJSONFromData(data)
      return


    return
]