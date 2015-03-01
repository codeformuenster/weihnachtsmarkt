angular.module('wm-map').service "searchService",[
  '$rootScope',
  'staendeService',
  ($rootScope, staendeService) ->
    _queryableProperties: [
      'betreiber',
      'warenangeb'
    ]

    setFilter: (filter) ->
      if filter?
        if filter.query?
            @_query = filter.query
        if filter.markt?
            @_markt = filter.markt
        @applyFilter staendeService.getAll().features
      return
    applyFilter: (features) ->
      # hide markets if set..
      features = features.filter((f) ->
        f.properties.markt == @_markt
      , @)

      # highlight queries
      if @_query? and @_query.trim() != ""
        regex = RegExp(@_query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i')
      else
        regex = /.^/
      features = features.map (f) ->
        f.properties.match = @_queryableProperties.some((q) -> regex.test(f.properties[q]))
        f
      , @ # inject this into map
      $rootScope.$broadcast 'map.updateFeatures', { type: "FeatureCollection", features: features }
      return
]