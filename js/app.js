angular.module('weihnachtsApp', [])
  .controller('staendeCtrl', function($scope, $http){
    $http.get('rathaus_ausstellerliste_testdaten.json').then(function(staendeJson) {
      $scope.staende = staendeJson.data;
    });
  });