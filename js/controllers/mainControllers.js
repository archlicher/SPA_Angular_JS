'use strict';

SocialNetwork.controller('MainController', function($scope, $route, $location, $rootScope, userService, friendService, postService, commentService, notifyService) {
	$scope.userService = userService;
	$scope.friendService = friendService;
	$scope.postService = postService;
	$scope.commentService = commentService;
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
				$scope.getNewsFeed();
				$location.path('/');
			},
			function error (errorData) {
				notifyService.showError('Failed to log in', errorData);
			});
	};

	$scope.register = function (registerData) {
		userService.register(registerData, 
			function success() {
				notifyService.showInfo('User registered successfully.');
				$scope.userHeaderInfo();
				$scope.getNewsFeed();
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
				$scope.posts = null;
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
		$scope.myfriends = userService.getMyFriends();
	};

	$scope.myFriendsPage = function () {
		$location.path('/friends');
	};

	$scope.goToUserWall = function (username) {
		userService.getUserData(username, 
			function success () {
				if (userService.getUserFromStorage().isFriend)
				friendService.getFriendsDetailFriendsList(userService.getUserFromStorage().username, userService.getHeaders(), 
					function error (errorData) {
					
				});				
				var usernameUrl = userService.getUserFromStorage().username;
				$location.path('/users/' + usernameUrl);
			},
			function error (errorData) {
				notifyService.showError('Failed to load user:', errorData)
			})
	};

	$scope.sendFriendRequest = function (username) {
		userService.sendFriendRequest(username, 
			function success () {
				notifyService.showInfo('Successfully send friend request.');
			},
			function error (errorData) {
				notifyService.showError('Failed to send friend request:', errorData);
			});
	};

	$scope.approveRequest = function (requestId) {
		userService.aproveFriendRequest(requestId, 
			function success () {
				notifyService.showInfo('You have a new friend.');
				userService.getMyFriends();
				userService.getFriendRequest();
				location.reload();
				$location.path('/')
			}, function error (errorData) {
				notifyService.showError('Failed to approve friend request:', errorData);
			})
	};

	$scope.rejectRequest = function (requestId) {
		userService.rejectFriendRequest(requestId, 
			function success () {
				notifyService.showInfo('You rejected a friend request.');
				userService.getMyFriends();
				userService.getFriendRequest();
				location.reload();
				$location.path('/')
			}, function error (errorData) {
				notifyService.showError('Failed to rejected friend request:', errorData);
			})
	};

	$scope.getNewsFeed = function () {
		userService.getNewsFeed(10, 
			function success (data) {
				$scope.newsfeed = userService.getNewsfeedFromStorage();
			},
			function error (errorData) {
				notifyService.showError('Failed to connect to server:', errorData);
			})
	};

	$scope.addPost = function (postContent) {
		var data = {}
		data.postContent = postContent;
		data.username = userService.getMyWallFromStorage().username;
		console.log(data);
		postService.addPost(data, userService.getHeaders(),
			function success () {
				notifyService.showInfo('Added a new post.');
				$scope.getNewsFeed();
				location.reload();
				$location.path('/')
			},
			function error (errorData) {
				notifyService.showError('Failed to add new post:', errorData);
			});	
	};

	$scope.searchForUser = function (name) {
		userService.searchUsersByName(name,
			function success () {
				
			},
			function error (errorData) {
				notifyService.showError('Failed to connect to server:', errorData);
			})
	}

	$scope.editPost = function (postId) {
		// body...
	};

	$scope.deletePost = function (postId) {
		postService.deletePost(postId, userService.getHeaders(),
			function success () {
				notifyService.showInfo('Post deleted.');
				$scope.getNewsFeed();
				$location.path('/')
			},
			function error (errorData) {
				notifyService.showError('Failed to delete post:', errorData);
			});
	};

	$scope.addComment = function (postId, commentContent) {
		var data = {};
		data.postId = postId;
		data.commentContent = commentContent;
		commentService.addCommentToPost(data, userService.getHeaders(),
			function success () {
				notifyService.showInfo('Added a comment.');
				$scope.getNewsFeed();
				$location.path('/')
			},
			function error (errorData) {
				notifyService.showError('Failed to add comment:', errorData);
			})
	};


	$scope.editComment = function (postId, commentId) {
		// body...
	};

	$scope.deleteComment = function (postId, commentId) {
		var data = {};
		data.postId = postId;
		data.commentId = commentId;
		commentService.deleteComment(data, userService.getHeaders(),
			function success () {
				notifyService.showInfo('Comment deleted.');
				$scope.getNewsFeed();
				$location.path('/')
			},
			function error (errorData) {
				notifyService.showError('Failed to delete comment:', errorData);
			});
	};

	$scope.likePost = function (postId) {
		postService.likePost(postId, userService.getHeaders(),
			function success () {
				$scope.getNewsFeed();
				$location.path('/')
			},
			function error (errorData) {
				notifyService.showError('Failed to like post:', errorData);
			})
	};

	$scope.unlikePost = function (postId) {
		postService.unlikePost(postId, userService.getHeaders(),
			function success () {
				$scope.getNewsFeed();
				$location.path('/')
			},
			function error (errorData) {
				notifyService.showError('Failed to unlike post:', errorData);
			})
	};

	$scope.likeComment = function (commentId) {
		commentService.likeComment(commentId, userService.getHeaders(),
			function success () {
				$scope.getNewsFeed();
				$location.path('/')
			},
			function error (errorData) {
				notifyService.showError('Failed to like comment:', errorData);
			})
	};

	$scope.unlikeComment = function (commentId) {
		commentService.unlikeComment(commentId, userService.getHeaders(),
			function success () {
				$scope.getNewsFeed();
				$location.path('/')
			},
			function error (errorData) {
				notifyService.showError('Failed to unlike comment:', errorData);
			})
	};

});