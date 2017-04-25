angular.module('myApp.controllers', [])
    .controller('IndexCtrl', function ($scope) {
    })
    .controller('LoginCtrl', function ($scope, $http) {
        $scope.send_login = function () {
            $http({
                method: 'POST',
                url: '/sessions',
                data: {
                    email: $scope.user.email,
                    password: $scope.user.password
                }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    console.log('RESPUESTA CORRECTA LLEVAME DENTRO PAPI', response);
                } else {
                    console.log('CONTRASENA INCORRECTA :(');
                }

            }, function errorCallback(response) {
                console.log('RESPUESTA INCORRECTAAAAA TE QUEDAS FUERA PAPI', response);
            });
        }
    })
    .controller('RegisterCtrl', function ($scope, $http) {
        $scope.register = function () {
            if ($scope.user.password == $scope.user.password_confirmation) {
                $http({
                    method: 'POST',
                    url: '/users',
                    data: {
                        name: $scope.user.name,
                        lastname: $scope.user.lastname,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        sex: $scope.user.sex,
                        interested: $scope.user.interested,
                        birth: $scope.user.birth
                    }
                }).then(function successCallback(response) {
                    console.log('USUARIO CREADO', response);
                }, function errorCallback(response) {
                    console.log('ERROR AL CREAR USUARIO', response);
                });
            }
        }
    })
    .controller('SearchCtrl', function ($scope) {
    })
    .controller('UpdateProfileCtrl', function ($scope) {
    })
    .controller('MatchesCtrl', function ($scope) {
    })
    .controller('ProfileCtrl', function ($scope) {
    })
    .controller('WelcomeCtrl', function ($scope) {
    })
;
