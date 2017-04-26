angular.module('myApp', ['myApp.controllers','sessions.controllers','sessions.services','users.controllers','users.services','categories.services']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/index',
        controller: 'IndexCtrl'
    }).
    when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
    }).
    when('/register', {
        templateUrl: 'partials/register',
        controller: 'RegisterCtrl'
    }).
    when('/welcome', {
        templateUrl: 'partials/welcome',
        controller: 'WelcomeCtrl',
        resolve: {
            categoriesData: function(userCategoryService){
                return userCategoryService.get();
            },
            likesData: function(userLikesService){
                return userLikesService.get();
            }
        }
    }).
    when('/search', {
        templateUrl: 'partials/search',
        controller: 'SearchCtrl',
        resolve: {
            interestedData: function(userService){
                return userService.interested( {timeout: 5000});
            }
        }
    }).
    when('/update', {
        templateUrl: 'partials/update',
        controller: 'UpdateProfileCtrl'
    }).
    when('/profile', {
        templateUrl: 'partials/profile',
        controller: 'ProfileCtrl'
    }).
    when('/matches', {
        templateUrl: 'partials/matches',
        controller: 'MatchesCtrl',
        resolve: {
            matchesData: function(userService){
                return userService.getMatches({timeout: 5000});
            }
        }
    }).
    otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  }]);