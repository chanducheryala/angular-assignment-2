"use strict"

angular.module("appAjs")
    .controller("UserController", ['$scope', 'UserService', '$window', function($scope, UserService, $window) {
        var uc = this;
        uc.users = [];
        uc.loading = true;
        uc.error = null;

        $scope.goToDashboard = function() {
            // Use $window to ensure proper navigation in the hybrid app
            $window.location.href = '/dashboard';
        };

        UserService.getUsers()
            .then(function(users) {
                uc.users = users;
            })
            .catch(function(err) {
                uc.error = 'Failed to load users';
            })
            .finally(function() {
                uc.loading = false;
            });
    }])