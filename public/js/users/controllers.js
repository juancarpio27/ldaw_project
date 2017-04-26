angular.module('users.controllers', [])
    .controller('RegisterCtrl', function ($scope, $http,userService,$location) {

        $scope.error_login = false;

        $scope.register = function () {

            if ($scope.user.password == $scope.user.password_confirmation) {

                var data = {
                    name: $scope.user.name,
                    lastname: $scope.user.lastname,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    sex: $scope.user.sex,
                    interested: $scope.user.interested,
                    birth: $scope.user.birth
                };

                userService.createUser(data).then(function successCallback(response) {
                    $location.path('/login').replace();
                }, function errorCallback(response) {
                    $scope.error_login = true;
                });
            }
        }
    });