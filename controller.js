var app = angular.module('characterProfiles');

app.controller('MainController', function($scope, mainService) {
  
  $scope.getcharacters = function() {
    mainService.getCharacters().then(function(dataFromService) {
      $scope.users = dataFromService.data.results;
    });
  };

  $scope.getCharacters();

});