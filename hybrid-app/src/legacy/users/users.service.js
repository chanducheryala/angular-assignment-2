"use strict";

angular.module("appAjs")
    .service("UserService", ['$http', function($http) {
       
        this.getUsers = function() {
            return $http.get("https://jsonplaceholder.typicode.com/users")
                .then(function(response) { return response.data; });
        };
    }])