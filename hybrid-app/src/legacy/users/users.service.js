"use strict";

angular.module("appAjs")
.service("UserService", [function() {
    var users = [
        { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", phone: "1-770-736-8031" },
        { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", phone: "010-692-6593" }
    ];
    var nextId = 3;

    this.getUsers = function() {
        return users;
    };

    this.addUser = function(user) {
        if(!user.name || !user.username || !user.email) {
            throw new Error("Name, Username & Email are required!");
        }
        user.id = nextId++;
        users.push(angular.copy(user));
    };

    this.updateUser = function(updatedUser) {
        var index = users.findIndex(u => u.id === updatedUser.id);
        if(index !== -1) {
            users[index] = angular.copy(updatedUser);
        }
    };

    this.deleteUser = function(id) {
        var index = users.findIndex(u => u.id === id);
        if(index !== -1) {
            users.splice(index, 1);
        }
    };
}]);
