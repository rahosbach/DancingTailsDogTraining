'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.filters',
  'myApp.factory',
  'myApp.directives'
])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home',
      controller: 'HomeCtrl',
      resolve:{
        delay: function($q, $timeout){
          var delay = $q.defer();
          delay.resolve(true);
          return delay.promise;
        }
      }
    })
    .when('/about',{
      templateUrl: 'partials/about',
      controller: 'AboutCtrl',
      resolve:{
        delay: function($q, $timeout){
          var delay = $q.defer();
          delay.resolve(true);
          return delay.promise;
        }
      }
    })
    .when('/philosophy', {
      templateUrl: 'partials/philosophy',
      controller: 'PhilosophyCtrl',
      resolve:{
        delay: function($q, $timeout){
          var delay = $q.defer();
          delay.resolve(true);
          return delay.promise;
        }
      }
    })
    .when('/services',{
      templateUrl: 'partials/services',
      controller: 'ServicesCtrl',
      resolve:{
        delay: function($q, $timeout){
          var delay = $q.defer();
          delay.resolve(true);
          return delay.promise;
        }
      }
    })
    .when('/videos', {
      templateUrl: 'partials/videos',
      controller: 'VideosCtrl',
      resolve:{
        data: function($q, $timeout,$http){
          var delay = $q.defer();
          $http.get('api/videos')
            .success(function(data, status, headers, config){
                delay.resolve(data);
              });
          return delay.promise;
        }
      }
    })
    .when('/clients',{
      templateUrl: 'partials/clients',
      controller: 'ClientsCtrl'
    })
    .when('/contact',{
      templateUrl: 'partials/contact',
      controller: 'ContactCtrl',
      resolve:{
        delay: function($q, $timeout){
          var delay = $q.defer();
          delay.resolve(true);
          return delay.promise;
        }
      }
    })
    .when('/messages',{
      templateUrl: 'partials/messages',
      controller: 'MessagesCtrl',
      resolve:{
        auth: function($q, authenticationService){
          var userInfo = authenticationService.getUserInfo();
          if (userInfo) {
            return $q.when(userInfo);
          }
          else{
            return $q.reject({authenticated:false});
          }
        }
      }
    })
    .when("/admin",{
      templateUrl: 'partials/login',
      controller:'LoginCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
})
.run(["$rootScope", "$location", function ($rootScope, $location) {
  $rootScope.$on("$routeChangeSuccess", function(userInfo) {
    // console.log(userInfo);
  });
 
  $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
    if (eventObj.authenticated === false) {
      $location.path("/login");
    }
  });
}]);