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
      filtered = features
      if @_markt?
        filtered = filtered.filter((f) ->
          f.properties.markt == @_markt
        , @)
      if @_query?
        regex = RegExp(@_query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i')
        filtered = filtered.filter((f) ->
          @_queryableProperties.some((q) ->
            regex.test(f.properties[q]))
        , @)

        $rootScope.$broadcast 'map.updateFeatures', { type: "FeatureCollection", features: filtered }
      return
]