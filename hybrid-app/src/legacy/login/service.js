(function() {
  'use strict';

  angular.module('appAjs')
    .service('AuthServiceAjs', ['$window', function($window) {
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
        // Simple hardcoded validation
        if (username === 'admin' && password === 'admin') {
          setAuth(username);
          return true;
        }
        return false;
      };

      this.logout = function() { clearAuth(); };
      this.isAuthenticated = function() { return isAuthed(); };
      this.getUsername = function() { return getUsername(); };
    }]);
})();
