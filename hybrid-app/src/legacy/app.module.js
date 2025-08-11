'use strict';

angular.module('appAjs', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/login', {
        templateUrl: 'legacy/login/login.template.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }])
  .run(['$window', '$location', function($window, $location) {
    var hasHash = !!$window.location.hash;
    var hash = $window.location.hash || '';
    var atRoot = $window.location.pathname === '/' || $window.location.pathname === '';
    var authed = false;
    try { authed = $window.localStorage.getItem('auth') === '1'; } catch (e) {}

    if (authed && (atRoot || hash.indexOf('#/login') === 0)) {
      $window.location.replace('/dashboard');
      return;
    }

    if (!authed && !hasHash && atRoot) {
      $location.path('/login');
    }
  }]);
