'use strict';

SocialNetwork.controller('MainController', function($scope, $location, $rootScope, userService, friendService, postService, commentService, notifyService) {
	$scope.userService = userService;
	$scope.notifyService = notifyService;
	$scope.isUserNotLogged = !userService.isUserLogged();
	$scope.isUserLogged = userService.isUserLogged();
	$scope.updateProfile = {name:null, email:null, profileImageData:null, coverImageData:null, gender:null};
	$scope.post = {postContent:null, username:null};
	$scope.comment = {commentContent:null};

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

	$scope.editProfile = function (updateProfile) {
		userService.editProfile(updateProfile,
			function success () {
				$scope.userHeaderInfo();
				notifyService.showInfo('Successful profile edit.');
				$location.path('/');
			},
			function error (errorData) {
				notifyService.showError('Unsuccessful profile edit!', errorData);
			});
	};

	$scope.changePassword = function (changePass) {
		userService.changePassword(changePass, 
			function success () {
				notifyService.showInfo('Successfully changed password.');
				$location.path('/');
			},
			function error (errorData) {
				notifyService.showError('Failed to change password!', errorData);
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

	$scope.fileSelectedProfileImage = function(fileInputField) {
		delete $scope.updateProfile.profileImageData;
		var file = fileInputField.files[0];
		if (file.type.match(/image\/.*/)) {
			var reader = new FileReader();
			reader.onload = function() {
				$scope.updateProfile.profileImageData = reader.result;
				$("#profile-box").html("<img src='" + reader.result + "'>");
			};
			reader.readAsDataURL(file);
		} else {
			$("#profile-box").html("<p>File type not supported!</p>");
		}
	};

	$scope.fileSelectedCoverPhoto = function(fileInputField) {
		delete $scope.updateProfile.coverImageData;
		var file = fileInputField.files[0];
		if (file.type.match(/image\/.*/)) {
			var reader = new FileReader();
			reader.onload = function() {
				$scope.updateProfile.coverImageData = reader.result;
				$("#cover-box").html("<img src='" + reader.result + "'>");
			};
			reader.readAsDataURL(file);
		} else {
			$("#cover-box").html("<p>File type not supported!</p>");
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

	$scope.getNewsFeed = function () {
		
	}
});