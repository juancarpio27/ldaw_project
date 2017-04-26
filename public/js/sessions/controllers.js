angular.module('sessions.controllers', [])
    .controller('LoginCtrl', function ($scope, $http,loginService,$location) {

        $scope.error_login = false;

        $scope.send_login = function () {
            loginService.loginUser($scope.user.email, $scope.user.password).then(function successCallback(response) {
                if (response.data.success) {
                    localStorage.setItem('user',JSON.stringify(response.data.user));
                    $location.path('/welcome').replace();
                } else {
                    $scope.error_login = true;
                }
            }, function errorCallback(response) {
                $scope.error_login = true;
            });
        };

        $scope.loginFacebook = function(){
            loginService.loginFacebook.then(function(result){

            }, function(Error){

            })
        }
    });