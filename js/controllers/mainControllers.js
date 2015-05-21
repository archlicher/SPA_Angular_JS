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
				$scope.user = {};
				userRestService.getUserPreview(
					function success (userPreview) {
					$scope.user.img = userPreview.profileImageData;
					$scope.user.name = userPreview.name;
				})
			},
			function error (errorData) {
				notify.showError('Invalid username or password!', errorData);
			})
	};

	$scope.register = function (registerData) {
		userRestService.register(registerData, 
			function success() {
				notify.showInfo('User registered successfully.');
				ClearData();
			},
			function error(errorData) {
				notify.showError('User registration failed!', errorData);
			});
	};

	$scope.logout = function () {
		userRestService.logout(
			function success () {
				notify.showInfo('Successful logout.')
				$location.path('/');
			}, 
			function error (errorData) {
				notify.showError('Faild to logout!', errorData)
			});
	}

	var ClearData = function () {
		$scope.loginData = '';
		$scope.registerData = '';
		$scope.userData = '';
		$scope.passwordData = '';
	}
});