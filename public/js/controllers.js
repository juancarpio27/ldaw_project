angular.module('myApp.controllers', [])
    .controller('IndexCtrl', function ($scope) {
    })
    .controller('NavbarCtrl', function ($scope,loginService,$location) {

        $scope.logout = function(){
            loginService.logoutUser().then(function(data){
                $location.path('/login').replace();
            });
        }
    })

    .controller('SearchCtrl', function ($scope,userService,interestedData) {
        $scope.interested = interestedData.data.users;
        $scope.index = 0;
        console.log($scope.interested);

        $scope.searchMore = function(){
            userService.interested().then(function(data){
                $scope.interested = data.data.users;
                $scope.index = 0;
            });
        };

        $scope.responseToUser = function(like){

            var user = JSON.parse(localStorage.getItem('user'));
            var user_id = user.id;
            var user_seen_id = $scope.interested[$scope.index].id;
            var data = {
                user_id: user_id,
                user_seen_id: user_seen_id,
                liked: like
            };
            userService.matchAction(data,{timeout: 5000}).then(function(data){
                if (data.data.match)
                    alert("It's a match!!");
            });
            $scope.index++;
        }

    })
    .controller('UpdateProfileCtrl', function ($scope) {
    })
    .controller('MatchesCtrl', function ($scope,matchesData,userService) {
        $scope.matches = matchesData.data.matches;

        $scope.removeMatch = function(match){
            userService.destroyMatch(match).then(function(data){
                console.log('match erased');
            })
        }

    })
    .controller('ProfileCtrl', function ($scope) {
    })
    .controller('WelcomeCtrl', function ($scope,categoriesData,likesData,userService,userCategoryService,userLikesService) {
        $scope.categories = categoriesData.data.category_users;
        $scope.likes = likesData.data;
        $scope.user = JSON.parse(localStorage.getItem('user'));

        $scope.editingProfile = false;
        $scope.edit = function(){
            $scope.editingProfile = !$scope.editingProfile;
        };

        $scope.update = function(){

            var user_data = {
                name: $scope.user.name,
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                password: $scope.user.password,
                birth: $scope.user.birth.substring(0,10),
                sex: $scope.user.sex,
                interested: $scope.user.interested,
                id: $scope.user.id
            };

            userService.updateUser(user_data).then(function(data){
                console.log('DATA RECEIVED ON RESPONSE',data);
                localStorage.setItem('user',JSON.stringify(user_data));
            });

            console.log('save the update');
            $scope.editingProfile = !$scope.editingProfile;
        };

        $scope.editingCategories = false;
        $scope.editCategories = function(){
            $scope.editingCategories = !$scope.editingCategories;
        };

        $scope.removeCategory = function(category){
            userCategoryService.destroy(category.category_id).then(function(data){
                console.log('Object removed',data);
            })
        };



        $scope.editingLikes = false;
        $scope.editLikes = function(){
            $scope.editingLikes = !$scope.editingLikes
        };

        $scope.removeLike = function(category){
            userLikesService.destroy(category.category_id).then(function(data){
                console.log('Object removed',data);
            })
        }



    })
;
