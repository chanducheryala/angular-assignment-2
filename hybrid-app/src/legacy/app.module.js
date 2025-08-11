'use strict';

angular.module('appAjs', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $routeProvider
      .when('/login', {
        templateUrl: 'legacy/login/login.template.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/users', {
        templateUrl: 'legacy/users/users.template.html',
        controller: 'UserController',
        controllerAs: 'uc'
      });
  }])
  .run(['$window', '$location', '$rootScope', function($window, $location, $rootScope) {
    var path = $location.path();
    var authed = false;
    try { authed = $window.localStorage.getItem('auth') === '1'; } catch (e) {}

    $rootScope.$on('$routeChangeStart', function(event, next) {
      var isLoginPage = next.$$route && next.$$route.originalPath === '/login';
      var isAuthPage = next.$$route && next.$$route.originalPath === '/users';
      
      if (isAuthPage && !authed) {
        event.preventDefault();
        $location.path('/login');
      }
      
      if (isLoginPage && authed) {
        event.preventDefault();
        $location.path('/dashboard');
      }
    });

    if (path === '/' || path === '') {
      if (authed) {
        $location.path('/dashboard');
      } else {
        $location.path('/login');
      }
    }
  }]);
