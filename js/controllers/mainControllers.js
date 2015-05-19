'use strict';

SocialNetwork.controller('MainController', 
function($scope, $location, $route, restService, notify) {

	$scope.isUserNotLogged = true;
	$scope.isUserLogged = false;

	$scope.login = function () {
		restService.login(loginData,
			function success (serverData) {
				notify.showInfo('Successfully loged in!');
				restService.SetUserToStorage(serverData)
			})
	}

	var ClearData = function () {
		$scope.loginData = '';
		$scope.registerData = '';
		$scope.userData = '';
		$scope.passwordData = '';
	}

});