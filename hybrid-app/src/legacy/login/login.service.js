
  'use strict';

  angular.module('appAjs')
    .service('AuthServiceAjs', ['$window', '$q', '$timeout', function($window, $q, $timeout) {
      function setAuth(username) {
        try {
          $window.localStorage.setItem('auth', '1');
          $window.localStorage.setItem('username', username || '');
        } catch (e) {}
      }
      function clearAuth() {
        try {
          $window.localStorage.removeItem('auth');
          $window.localStorage.removeItem('username');
        } catch (e) {}
      }
      function isAuthed() {
        try {
          return $window.localStorage.getItem('auth') === '1';
        } catch (e) { return false; }
      }
      function getUsername() {
        try { return $window.localStorage.getItem('username'); } catch (e) { return null; }
      }

      this.login = function(username, password) {
        return $q(function(resolve, reject) {
          $timeout(function() {
            if (username === 'admin' && password === 'admin') {
              setAuth(username);
              resolve(true);
            } else {
              reject(new Error('INVALID_CREDENTIALS'));
            }
          }, 400);
        });
      };

      this.logout = function() { clearAuth(); };
      this.isAuthenticated = function() { return isAuthed(); };
      this.getUsername = function() { return getUsername(); };
    }]);
