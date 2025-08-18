"use strict";

angular.module("appAjs")
.constant('API_BASE_URL', 'http://localhost:8080/api')
.service("UserService", ['$http', 'API_BASE_URL', function($http, API_BASE_URL) {
    var self = this;
    var users = [];
    var initialized = false;

    function initialize() {
        if (!initialized) {
            return self.getUsers().then(function() {
                initialized = true;
            });
        }
        return $q.when();
    }

    this.getUsers = function() {
        return $http.get(API_BASE_URL + '/users')
            .then(function(response) {
                users = response.data || [];
                return users;
            })
            .catch(function(error) {
                console.error('Error fetching users:', error);
                throw new Error('Failed to fetch users. Please try again later.');
            });
    };

    this.addUser = function(user) {
        if (!user.name || !user.username || !user.email) {
            return $q.reject(new Error("Name, Username & Email are required!"));
        }

        return $http.post(API_BASE_URL + '/users', user)
            .then(function(response) {
                users.push(response.data);
                return response.data;
            })
            .catch(function(error) {
                console.error('Error adding user:', error);
                var errorMsg = error.data && error.data.message || 'Failed to add user. Please try again.';
                throw new Error(errorMsg);
            });
    };

    this.updateUser = function(updatedUser) {
        if (!updatedUser || !updatedUser.id) {
            return $q.reject(new Error("Invalid user data"));
        }

        return $http.put(API_BASE_URL + '/users/' + updatedUser.id, updatedUser)
            .then(function(response) {
                var index = users.findIndex(u => u.id === updatedUser.id);
                if (index !== -1) {
                    users[index] = response.data;
                } else {
                    users.push(response.data);
                }
                return response.data;
            })
            .catch(function(error) {
                console.error('Error updating user:', error);
                var errorMsg = error.data && error.data.message || 'Failed to update user. Please try again.';
                throw new Error(errorMsg);
            });
    };

    this.deleteUser = function(id) {
        return $http.delete(API_BASE_URL + '/users/' + id)
            .then(function() {
                var index = users.findIndex(u => u.id === id);
                if (index !== -1) {
                    users.splice(index, 1);
                }
            })
            .catch(function(error) {
                console.error('Error deleting user:', error);
                var errorMsg = error.data && error.data.message || 'Failed to delete user. Please try again.';
                throw new Error(errorMsg);
            });
    };
}]);
