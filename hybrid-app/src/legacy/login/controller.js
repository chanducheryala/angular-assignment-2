(function() {
  'use strict';

  angular.module('appAjs')
    .controller('LoginController', ['$window', 'AuthServiceAjs', function($window, AuthServiceAjs) {
      var vm = this;
      vm.username = '';
      vm.password = '';
      vm.error = '';

      vm.login = function() {
        if (AuthServiceAjs.login(vm.username, vm.password)) {
          $window.location.hash = '';
          $window.location.replace('/dashboard');
        } else {
          vm.error = 'Invalid credentials. Try user/pass';
        }
      };
    }]);
})();
