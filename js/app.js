'use strict';

var socialNetwork = angular.module('SocialNetwork', ['ngRoute']);

socialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');

socialNetwork.config(function($routeProvider) {
	$routeProvider
		.when('#/',{
			templateUrl:'partials/home-screen.html'
		})
});