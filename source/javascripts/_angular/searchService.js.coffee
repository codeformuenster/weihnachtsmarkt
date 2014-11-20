angular.module('wm-map').service "searchService",[
  '$rootScope',
  'staendeService',
  ($rootScope, staendeService) ->
    _queryableProperties:
      betreiber: true
      warenangeb: true

    setFilter: (query) ->
      if query?
          @_query = query
          @applyFilter staendeService.getAll().features
      return
    applyFilter: (features) ->
      filtered_featureCollection = { type: "FeatureCollection", features: [] }
      if @_query?
        regex = RegExp(@_query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i')
        for f in features
          feature_summary = ''
          # summarize feature for search
          for key of @_queryableProperties
            if @_queryableProperties.hasOwnProperty key
              if @_queryableProperties[key] is true
                feature_summary += f.properties[key]

          if f not in filtered_featureCollection.features and regex.test(feature_summary.toLowerCase())
            filtered_featureCollection.features.push f

        $rootScope.$broadcast 'map.updateFeatures', filtered_featureCollection
      return
]