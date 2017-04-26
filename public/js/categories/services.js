angular.module('categories.services', [])

    .factory('userCategoryService',function($http){

        var userCategoryService = {};

        userCategoryService.get = function(user,password){
            var user = JSON.parse(localStorage.getItem('user'));
            var id = user.id;
            return $http({
                method: 'GET',
                url: '/category_users/'+id
            });
        };

        userCategoryService.destroy = function(category_id){
            var user = JSON.parse(localStorage.getItem('user'));
            var id = user.id;
            var data = {category_id: category_id};

            return $http({
                method: 'POST',
                url: '/category_users/'+id+'/delete',
                data: data
            });
        };


        return userCategoryService;

    })

.factory('userLikesService',function($http){

    var userLikesService = {};

    userLikesService.get = function(user,password){
        var user = JSON.parse(localStorage.getItem('user'));
        var id = user.id;
        return $http({
            method: 'GET',
            url: '/user_likes/'+id
        });
    };

    userLikesService.destroy = function(category_id){
        var user = JSON.parse(localStorage.getItem('user'));
        var id = user.id;
        var data = {category_id: category_id};

        return $http({
            method: 'POST',
            url: '/user_likes/'+id+'/delete',
            data: data
        });
    };


    return userLikesService;

});