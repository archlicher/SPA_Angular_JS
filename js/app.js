'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute']);

SocialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');

SocialNetwork.config(function($routeProvider) {
	$routeProvider
		.when('/' ,{
			templateUrl :'partials/home-screen.html',
			controller : 'UserController'
		})
		.when('/login' ,{
			templateUrl :'partials/login-screen.html',
			controller : 'UserController'	
		})
		.when('/register' ,{
			templateUrl :'partials/register-screen.html',
			controller : 'UserController'
		})
		.otherwise({redirectTo: '/'})
});