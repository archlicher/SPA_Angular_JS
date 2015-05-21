'use strict';

SocialNetwork.controller('MainController', function($scope, $location, $rootScope, userService, notify) {
	$scope.userService = userService;
	$scope.notify = notify;
	$scope.isUserNotLogged = !userService.isUserLogged();
	$scope.isUserLogged = userService.isUserLogged();

	$scope.login = function (loginData) {
		userService.login($scope.loginData,
			function success (serverData) {
				//notify.showInfo('Successful login.');
				$location.path('/');
				userHeaderInfo();
			},
			function error (errorData) {
				notify.showError('Invalid username or password!', errorData);
			})
	};

	$scope.register = function (registerData) {
		console.log(registerData);
		userService.register(registerData, 
			function success() {
				//notify.showInfo('User registered successfully.');
				userHeaderInfo();
			},
			function error(errorData) {
				//notify.showError('User registration failed!', errorData);
			});
	};

	$scope.logout = function () {
		$location.path('/logout')
		userService.logout(
			function success () {
				//notify.showInfo('Successful logout.')
				$location.path('/');
			}, 
			function error (errorData) {
				console.log(errorData);
				//notify.showError('Faild to logout!', errorData)
			});
	};

	var userHeaderInfo = function () {
		var user = userService.getCurrentUser();
		$scope.user = {};
		userService.getUserPreview(user.userName,
					function success (userPreview) {
					$scope.user.img = userPreview.profileImageData;
					$scope.user.name = userPreview.name;
				}, function error (errorData) {
					
				});
	};
});