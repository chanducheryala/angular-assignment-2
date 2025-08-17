"use strict";

angular.module("appAjs")
.controller("UserController", ['$scope', 'UserService', '$window', '$timeout', function($scope, UserService, $window, $timeout) {
    var uc = this;
    uc.users = UserService.getUsers();
    uc.newUser = {};
    uc.editingUser = null;
    uc.success = null;
    uc.error = null;

    $scope.goToDashboard = function() {
        $window.location.href = '/dashboard';
    };

    uc.showAddForm = false;
    
    uc.addUser = function() {
        try {
            UserService.addUser(uc.newUser);
            uc.success = "User added successfully!";
            uc.newUser = {};
            uc.showAddForm = false;
            $timeout(function() {
                uc.success = null;
            }, 3000);
        } catch (err) {
            uc.error = err.message;
        }
    };


    uc.startEdit = function(user) {
        uc.editingUser = angular.copy(user);
    };


    uc.cancelEdit = function() {
        uc.editingUser = null;
    };


    uc.updateUser = function() {
        UserService.updateUser(uc.editingUser);
        uc.success = "User updated successfully!";
        uc.editingUser = null;
    };


    uc.deleteUser = function(user) {
        UserService.deleteUser(user.id);
        uc.success = "User deleted successfully!";
    };
}]);
