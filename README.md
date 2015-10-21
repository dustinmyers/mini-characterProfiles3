# User Profiles
### Understanding Services with $q
Now returning to our project where we are pulling Star Wars character profiles, we've made some good progress. We can now make real life API requests for data using $http (AJAX requests)!

But what happens if we want to have a bit more granular control over our code. Sometimes you'll want to manipulate your data before you send it over to the controller. That's where $q comes into play!

$q allows us to hold off on sending our data over until we're ready. It's fairly simple. All we need to do is edit our service.

## Step 1 Our Service
- Inject $q into the service
``` javascript
var app = angular.module('characterProfiles');

app.service('mainService', function($http, $q) {
  this.getCharacters = function() {
    return $http({
        method: 'GET',
        url: 'http://swapi.co/api/people/'
    })
  }
});
```

- Once injected we can begin using it by adding a deffered variable to handle it

``` javascript
var app = angular.module('characterProfiles');

app.service('mainService', function($http, $q) {
  this.getCharacters = function() {
    var deferred = $q.defer();
    return $http({
        method: 'GET',
        url: 'http://swapi.co/api/people/'
    })
  }
});
```

- Now let's add a promise to our service

``` javascript
var app = angular.module('characterProfiles');

app.service('mainService', function($http, $q) {
  this.getCharacters = function() {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://swapi.co/api/people/'
    }).then(function(response) {
      deferred.resolve(response)
    })
    return deferred.promise;
  }
});
```

Right now, our code should still work the same, so what's the point of $q? Why are we adding all of this weird code to our service?

Well imagine you wanted to make a change to your data before you sent it over to the controller. For instance, currently we have this happening in our controller:

``` javascript
mainService.getCharacters().then(function(dataFromService) {
  $scope.characters = dataFromService.data.results;
});
```

dataFromService.data.results??? We are loading a lot of unnecessary data into our controller. Rather than filter it out in our controller we can use $q to filter it out as we pull it through our service.

``` javascript
var app = angular.module('characterProfiles');

app.service('mainService', function($http, $q) {
  this.getCharacters = function() {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://swapi.co/api/people/'
    }).then(function(response) {
      var parsedResponse = response.data.results
      deferred.resolve(parsedResponse)
    })
    return deferred.promise;
  }
});
```

Now our controller can just take what it's given and not have to filter anything out. Like so:

``` javascript
var app = angular.module('characterProfiles');

app.controller('MainController', function($scope, mainService) {
  $scope.getCharacters = function() {
    mainService.getCharacters().then(function(dataFromService) {
      $scope.characters = dataFromService;
    });
  }

  $scope.getCharacters();

});
```

Cool stuff!

Let's go ahead and do something a little less relevant, but more fun. Let's change everyones name to Ralf. Since this is a data manipulations, we'll handle that in the service.

``` javascript
var app = angular.module('characterProfiles');

app.service('mainService', function($http, $q) {
  this.getCharacters = function() {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://reqr.es/api/users?page=1'
    }).then(function(response) {
      var parsedResponse = response.data.data
      for(var i = 0; i < parsedResponse.length; i++) {
        parsedResponse[i].name = 'Ralf'
      }
      deferred.resolve(parsedResponse)
    })
    return deferred.promise;
  }
});
```

Now all of our character's names are Ralf. While it isn't a very good real world example, it's good to see how we can manipulate things. $q!

Last note - you can head over to http://swapi.co to visit the documentation for the Star Wars API. Look around the site and find out what else you can do with their API. There is some cool stuff they have stored in their databases. Try to find their "DOCS" page, and see you if can any other kinds of requests, and maybe build out a cool Star Wars page! Good luck!!!
