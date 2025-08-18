"use strict";

angular.module("appAjs")
.controller("UserController", ['$scope', 'UserService', '$window', '$timeout', function($scope, UserService, $window, $timeout) {
    var uc = this;
    uc.users = [];
    uc.newUser = {};
    uc.editingUser = null;
    uc.success = null;
    uc.error = null;
    uc.isLoading = false;

    uc.loadUsers = function() {
        uc.isLoading = true;
        uc.error = null;
        
        UserService.getUsers()
            .then(function(users) {
                uc.users = users;
            })
            .catch(function(error) {
                uc.error = error.message;
                $timeout(function() { uc.error = null; }, 5000);
            })
            .finally(function() {
                uc.isLoading = false;
            });
    };

    $scope.goToDashboard = function() {
        $window.location.href = '/dashboard';
    };

    uc.showAddForm = false;
    
    uc.addUser = function() {
        if (uc.userForm && uc.userForm.$invalid) {
            uc.error = "Please fill in all required fields correctly.";
            $timeout(function() { uc.error = null; }, 3000);
            return;
        }

        uc.isLoading = true;
        uc.error = null;

        UserService.addUser(uc.newUser)
            .then(function() {
                uc.success = "User added successfully!";
                uc.newUser = {};
                uc.showAddForm = false;
                return uc.loadUsers(); 
            })
            .catch(function(error) {
                uc.error = error.message;
            })
            .finally(function() {
                uc.isLoading = false;
                $timeout(function() { 
                    uc.success = null;
                    uc.error = null;
                }, 3000);
            });
    };

    uc.startEdit = function(user) {
        uc.editingUser = angular.copy(user);
    };

    uc.cancelEdit = function() {
        uc.editingUser = null;
    };

    uc.updateUser = function() {
        if (uc.editForm && uc.editForm.$invalid) {
            uc.error = "Please fill in all required fields correctly.";
            $timeout(function() { uc.error = null; }, 3000);
            return;
        }

        uc.isLoading = true;
        uc.error = null;

        UserService.updateUser(uc.editingUser)
            .then(function() {
                uc.success = "User updated successfully!";
                uc.editingUser = null;
                return uc.loadUsers();
            })
            .catch(function(error) {
                uc.error = error.message;
            })
            .finally(function() {
                uc.isLoading = false;
                $timeout(function() { 
                    uc.success = null;
                    uc.error = null;
                }, 3000);
            });
    };

    uc.deleteUser = function(user) {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        uc.isLoading = true;
        uc.error = null;

        UserService.deleteUser(user.id)
            .then(function() {
                uc.success = "User deleted successfully!";
                return uc.loadUsers(); 
            })
            .catch(function(error) {
                uc.error = error.message;
            })
            .finally(function() {
                uc.isLoading = false;
                $timeout(function() { 
                    uc.success = null;
                    uc.error = null;
                }, 3000);
            });
    };

    uc.loadUsers();
}]);
