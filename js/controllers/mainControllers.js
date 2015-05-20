'use strict';

SocialNetwork.controller('MainController', 
function($scope, $location, $route, restService, notify) {
	
/*	localStorage['isUserLogged'] = false;
	localStorage['isUserNotLogged'] = true;
*/
	$scope.isUserNotLogged = false;
	$scope.isUserLogged = true;

	$scope.login = function () {
		restService.login(loginData,
			function success (serverData) {
				notify.showInfo('Successfully loged in!');
				restService.SetUserToStorage(serverData)
				ClearData();
			},
			function error (errorData) {
				notify.showError('Invalid username or password', errorData);
			})
	}

	var ClearData = function () {
		$scope.loginData = '';
		$scope.registerData = '';
		$scope.userData = '';
		$scope.passwordData = '';
	}

});