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
        for c in features
          feature_summary = ''
          traversePathAndAppend = (target, path, key) ->
            for section in path
              if angular.isArray(target)
                path.shift()
                traversePathAndAppend(t, path, key) for t in target
                return
              else
                target = target[section]

            if angular.isArray(target)
              feature_summary += str[key] for str in target
            else
              feature_summary += target[key]
            return
          appendProperty = (targetObj, obj, path) ->
            for key of obj
              if obj.hasOwnProperty key
                if obj[key] is true
                  traversePathAndAppend(targetObj.properties, path, key)
                else if angular.isArray obj[key]
                  newPath = path
                  newPath.push key
                  appendProperty targetObj, item, newPath for item in obj[key]
                else
                  newPath = path
                  newPath.push key
                  appendProperty targetObj, obj[key], newPath
                path = []
            return
          # summarize feature for search
          appendProperty c, @_queryableProperties, []

          if c not in filtered_featureCollection.features and regex.test(feature_summary.toLowerCase())
            filtered_featureCollection.features.push c

      $rootScope.$broadcast 'map.updateFeatures', filtered_featureCollection
      return
]