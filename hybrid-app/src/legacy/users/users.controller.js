"use strict"

angular.module("appAjs")
    .controller("UserController", ['$scope', 'UserService', function($scope, UserService) {
        var uc = this;
        uc.users = [];
        uc.loading = true;
        uc.error = null;

        $scope.goToDashboard = function() {
            window.location.href = '/dashboard';
            window.location.reload();
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