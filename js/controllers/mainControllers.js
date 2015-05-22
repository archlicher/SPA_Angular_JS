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
				userHeaderInfo();
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
				userHeaderInfo();
				$location.path('/');
			},
			function error(errorData) {
				notifyService.showError('User registration failed!', errorData);
			});
	};

	$scope.logout = function () {
		userService.logout(
			function success () {
				notifyService.showInfo('Successful logout.')
				location.reload();
			}, 
			function error (errorData) {
				notifyService.showError('Failed to logout!', errorData)
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

	var userHeaderInfo = function () {
		var user = userService.getCurrentUser();
		$scope.user = {};
		userService.getUserPreview(user.userName,
				function success (userPreview) {
				$scope.user.img = sessionStorage['userData'].profileImageData;
				$scope.user.name = sessionStorage['userData'].name;
				$scope.user.pendingRequest = sessionStorage['userData'].hasPendingRequest;
				if (sessionStorage['userData'].hasPendingRequest) {
					userService.getFriendRequest(
						function success () {
							var requests = userService.pendingRequests();
							$scope.user.requests = userService.pendingRequests();
							$scope.user.requestCount = requests.length;
						},
						function error (data) {
							
						});
				}
			}, function error (errorData) {	
		});
	};
});