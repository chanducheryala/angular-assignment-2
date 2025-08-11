'use strict';

angular.module('appAjs')
  .controller('LoginController', ['$window', 'AuthServiceAjs', function($window, AuthServiceAjs) {
    var vm = this;
    vm.username = '';
    vm.password = '';
    vm.error = '';
    vm.loading = false;

    vm.login = function() {
      vm.error = '';
      vm.loading = true;
      AuthServiceAjs.login(vm.username, vm.password)
        .then(function() {
          $window.location.hash = '';
          $window.location.replace('/dashboard');
        })
        .catch(function() {
          vm.error = 'Invalid credentials. Try admin/admin';
        })
        .finally(function() {
          vm.loading = false;
        });
    };
  }]);
