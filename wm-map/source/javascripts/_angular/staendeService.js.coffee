angular.module('wm-map').service "staendeService", [
  '$http',
  '$rootScope'
  ($http, $rootScope) ->
    _data: { type: "FeatureCollection", features: [] }
    fetchData: ->
      self = @
      $http.get("data.json").success (data, status) ->
        self._setData data
        $rootScope.$broadcast 'map.updateFeatures', self._data
        return
      return
    _setData: (fCollection) ->
      @_data = fCollection
      return
    getAll: ->
      @_data

]