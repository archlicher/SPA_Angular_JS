'use strict';

var socialNetwork = angular.module('SocialNetwork', ['ngRoute']);

socialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');

socialNetwork.config(function($routeProvider) {
	$routeProvider
		.when('#/' ,{
			templateUrl :'partials/home-screen.html',
			controller : 'UserController'
		})
		.when('#/login' ,{
			templateUrl :'partials/login-screen.html',
			controller : 'UserController'	
		})
		.when('#/register' ,{
			templateUrl :'partials/register-screen.html',
			controller : 'UserController'
		})
		.otherwise({redirectTo: '#/'})
});