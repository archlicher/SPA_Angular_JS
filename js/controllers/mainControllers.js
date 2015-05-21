'use strict';

SocialNetwork.controller('MainController', 
function($scope, $location, $rootScope, userRestService, notify) {
	$scope.userRestService = userRestService;
	$scope.isUserNotLogged = !userRestService.isUserLogged();
	$scope.isUserLogged = userRestService.isUserLogged();

	$scope.login = function (loginData) {
		userRestService.login($scope.loginData,
			function success (serverData) {
				notify.showInfo('Successful login.');
				ClearData();
				$location.path('/');
			},
			function error (errorData) {
				notify.showError('Invalid username or password!', errorData);
			})
	};

	$scope.register = function (registerData) {
		userRestService.register(registerData, 
			function success() {
				notify.showInfo("User registered successfully");
				ClearData();
			},
			function error(errorData) {
				notify.showError("User registration failed");
			});
	};

	var ClearData = function () {
		$scope.loginData = '';
		$scope.registerData = '';
		$scope.userData = '';
		$scope.passwordData = '';
	}
});