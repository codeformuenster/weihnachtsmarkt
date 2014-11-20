angular.module("wm-map").controller "MapController", [
  "$scope",
  "leafletData",
  "searchService",
  "staendeService",
  "$timeout"
  ($scope, leafletData, searchService, staendeService, $timeout) ->
    # set up basic stuff
    angular.extend $scope,
      muenster:
        lat: 51.96255
        lng: 7.62547
        zoom: 17
      defaults:
        maxZoom: 21
      tiles:
          url: ''
      search_query: ''
      geojson:
        data: { type: "FeatureCollection", features: [] }
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
          ,500
          ,false

        return

    setAndApplyFilter = (value, oldvalue, scope) ->
      query = $scope.search_query.trim().toLowerCase()
      searchService.setFilter query
      return

    $scope.$watch 'search_query', setAndApplyFilter

    # fetch the data, broadcasts map.updateFeatures event
    staendeService.fetchData()

    $scope.$on 'map.updateFeatures', (evt, data) ->
      $scope.updateGeoJSONFromData(data)
      return


    return
]