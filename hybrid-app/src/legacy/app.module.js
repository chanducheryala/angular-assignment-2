'use strict';

angular.module('appAjs', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/login', {
        templateUrl: 'legacy/login/login.template.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when("/users", {
        templateUrl: "legacy/users/users.template.html",
        controller: "UserController",
        controllerAs: "uc",
      });
  }])
  .run(['$window', '$location', function($window, $location) {
    var hash = $window.location.hash || '';
    var atRoot = $window.location.pathname === '/' || $window.location.pathname === '';
    var authed = false;
    try { authed = $window.localStorage.getItem('auth') === '1'; } catch (e) {}

    // Only redirect if we're at the root path and not already navigating to a hash route
    if (authed && atRoot && !hash) {
      $window.location.replace('/dashboard');
      return;
    }

    // Redirect to login if not authenticated and not already going to login
    if (!authed && atRoot && hash.indexOf('#/login') === -1) {
      $location.path('/login');
    }
  }]);
