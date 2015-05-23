'use strict';

SocialNetwork.controller('MainController', function($scope, $location, $rootScope, userService, friendService, postService, commentService, notifyService) {
	$scope.userService = userService;
	$scope.notifyService = notifyService;
	$scope.isUserNotLogged = !userService.isUserLogged();
	$scope.isUserLogged = userService.isUserLogged();

	$scope.login = function (loginData) {
		userService.login($scope.loginData,
			function success (serverData) {
				notifyService.showInfo('Successful login.');
				$scope.userHeaderInfo();
				$location.path('/');
			},
			function error (errorData) {
				notifyService.showError('Invalid username or password!', errorData);
			});
	};

	$scope.register = function (registerData) {
		userService.register(registerData, 
			function success() {
				notifyService.showInfo('User registered successfully.');
				$scope.userHeaderInfo();
				$location.path('/');
			},
			function error(errorData) {
				notifyService.showError('User registration failed!', errorData);
			});
	};

	$scope.logout = function () {
		userService.logout(
			function success () {
				notifyService.showInfo('Successful logout.');
				$location.path('/');
			}, 
			function error (errorData) {
				notifyService.showError('Failed to logout!', errorData);
				$location.path('/');
			});
	};

	$scope.fileSelected = function(fileInputField) {
		delete $scope.adData.imageDataUrl;
		var file = fileInputField.files[0];
		if (file.type.match(/image\/.*/)) {
			var reader = new FileReader();
			reader.onload = function() {
				$scope.adData.imageDataUrl = reader.result;
				$(".image-box").html("<img src='" + reader.result + "'>");
			};
			reader.readAsDataURL(file);
		} else {
			$(".image-box").html("<p>File type not supported!</p>");
		}
	};

	$scope.userHeaderInfo = function () {
		userService.getMyWallData(
			function success () {
				$scope.me = userService.getMyWallFromStorage();
			},
			function error (errorData) {
				notifyService.showError('Failed to connect to server!',errorData)
			});
		userService.getFriendRequest(
			function success (requests) {
				if(requests.length != 0) {
					$scope.requests = userService.getMyFriendRequests();
				}
			},
			function error (errorData) {
				notifyService.showError('Failed to connect to server!',errorData)
			});
	};
});