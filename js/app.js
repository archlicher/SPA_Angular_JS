'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute','ngResource']);

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
		.when('/users/:username' ,{
			templateUrl : 'partials/user-wall-screen.html',
			controller : 'UserController'
		})
		.when('/profile' ,{
			templateUrl : 'partials/edit-profile-screen.html',
			controller : 'UserController'
		})
		.when('/profile/password' ,{
			templateUrl : 'partials/edit-password-screen.html',
			controller : 'UserController'
		})
		.when('/logout' ,{
			templateUrl : 'partials/logout-screen.html',
			controller : 'UserController',
			redirectTo : '/'	
		})
		.when('#/users/:username/friends' ,{
			templateUrl : 'partials/friend-screen.html',
			controller : 'FriendController'
		})
		.when('#/users/:username/:post', {
			templateUrl : 'partials/edit-post-screen.html',
			controller : 'PostController'
		})
		.otherwise({redirectTo: '/'});
});

SocialNetwork.run(function ($location, $rootScope) {
	$rootScope.$on('$locationChangeStart', function (event) {
		if (!sessionStorage['currentUser'] == undefined) {
			$location.path("/");
		}
	});
});