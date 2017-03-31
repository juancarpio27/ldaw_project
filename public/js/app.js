// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config();

angular.module('myApp', ['myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']).
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
        controller: 'WelcomeCtrl'
    }).
    when('/search', {
        templateUrl: 'partials/search',
        controller: 'SearchCtrl'
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
        controller: 'MatchesCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  }]);