(function() {
  'use strict';

  angular.module('appAjs')
    .controller('LoginController', ['$window', function($window) {
      var vm = this;
      vm.username = '';
      vm.password = '';
      vm.error = '';

      vm.login = function() {
        if (vm.username === 'admin' && vm.password === 'admin') {
          try {
            $window.localStorage.setItem('auth', '1');
            $window.localStorage.setItem('username', vm.username);
          } catch (e) {}
          $window.location.hash = '';
          $window.location.replace('/dashboard');
        } else {
          vm.error = 'Invalid credentials!';
        }
      };
    }]);
})();
