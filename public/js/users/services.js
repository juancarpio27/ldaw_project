angular.module('users.services', [])

    .factory('userService',function($http){

        var userService = {};

        userService.createUser = function(data){
            return $http({
                method: 'POST',
                url: '/users',
                data: data
            })
        };

        userService.interested = function(){
            var user = JSON.parse(localStorage.getItem('user'));
            var id = user.id;
            return $http({
                method: 'GET',
                url: '/users/'+id+'/interested'
            });
        };

        userService.matchAction = function(data){
            return $http({
                method: 'POST',
                url: '/user_seen',
                data: data
            });
        };

        userService.getMatches = function(){
            var user = JSON.parse(localStorage.getItem('user'));
            var id = user.id;
            return $http({
                method: 'GET',
                url: '/matches/'+id
            });
        };


        userService.destroyMatch = function(match){
            return $http({
                method: 'DELETE',
                url: '/matches/'+match.id
            });
        };


        userService.updateUser = function(data){
            var user = JSON.parse(localStorage.getItem('user'));
            var id = user.id;
            return $http({
                method: 'POST',
                url: '/users/'+id,
                data: data
            });
        };

        return userService;

    });