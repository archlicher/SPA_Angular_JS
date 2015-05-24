'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute','ngResource','ui.bootstrap']);

SocialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');

SocialNetwork.config(function($routeProvider) {
	$routeProvider
		.when('/' ,{
			templateUrl :'partials/home-screen.html',
			controller : 'MainController'
		})
		.when('/login' ,{
			templateUrl :'partials/login-screen.html',
			controller : 'MainController'	
		})
		.when('/register' ,{
			templateUrl :'partials/register-screen.html',
			controller : 'MainController'
		})
		.when('/friends' ,{
			templateUrl : 'partials/user-wall-screen.html',
			controller : 'MainController'
		})
		.when('/users/:username' ,{
			templateUrl : 'partials/friend-screen.html',
			controller : 'MainController'
		})
		.when('/profile' ,{
			templateUrl : 'partials/edit-profile-screen.html',
			controller : 'MainController'
		})
		.when('/profile/password' ,{
			templateUrl : 'partials/edit-password-screen.html',
			controller : 'MainController'
		})
		.when('/logout' ,{
			templateUrl : 'partials/logout-screen.html',
			controller : 'MainController'
		})
		.when('#/users/:username/friends' ,{
			templateUrl : 'partials/friend-screen.html',
			controller : 'MainController'
		})
		.when('#/users/:username/:post', {
			templateUrl : 'partials/edit-post-screen.html',
			controller : 'MainController'
		})
		.otherwise({redirectTo: '/'});
});

SocialNetwork.run(function ($location, $rootScope) {
	$rootScope.$on('$locationChangeStart', function (event) {
		var url = $location.path()
		if (sessionStorage['currentUser'] == undefined && url != '/login' && url != '/register') {
			$location.path("/");
		}
	});
});