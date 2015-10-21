var app = angular.module('characterProfiles');

app.service('mainService', function($http, $q) {

  this.getUsers = function() {
    return $http({
        method: 'GET',
        url: 'http://swapi.co/api/people/'
    })
  };

});
