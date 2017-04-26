angular.module('sessions.services', [])

    .factory('loginService',function($http){

        var loginService = {};

        loginService.loginUser = function(user,password){
          return $http({
              method: 'POST',
              url: '/sessions',
              data: {
                  email: user,
                  password: password
              }
          });
        };

        loginService.loginFacebook = function(){
            return $http({
                method: 'GET',
                url: '/auth/facebook'
            });
        };

        loginService.logoutUser = function(){
            return $http({
                method: 'DELETE',
                url: '/sessions'
            });
        };

        return loginService;

    });