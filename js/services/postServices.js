'use strict';

SocialNetwork.factory('postService', function ($http, baseUrl){
	return {
		getPostById : function (postId, headers, success, error) {
			var request = {
				method : 'GET',
                headers : headers,
                url : baseUrl + 'Posts/' + postId
			};
			$http(request).success(function (data) {
				success(data);
			}).error(error);
		},

		addPost : function (postData, headers, success, error) {
			var request = {
				method : 'POST',
                headers : headers,
                url : baseUrl + 'posts/',
                data : postData
			};
			$http(request).success(function (data) {
				success(data);
			}).error(error);
		},

		deletePost : function (postId, headers, success, error) {
			var request = {
				method : 'DELETE',
                headers : headers,
                url : baseUrl + 'Posts/'+ postId
			};
			$http(request).success(function (data) {
				success(data);
			}).error(error);
		},

		getPostDetailedLikes : function (postId, headers, success, error) {
			var request = {
				method : 'GET',
                headers : headers,
                url : baseUrl + 'Posts/' + postId + '/likes'
			};
			$http(request).success(function (data) {
				success(data);
			}).error(error);
		},

		getPostLikesPreview : function (postId, headers, success, error) {
			var request = {
				method : 'GET',
                headers : headers,
                url : baseUrl + 'Posts/' + postId + '/likes/preview'
			};
			$http(request).success(function (data) {
				success(data);
			}).error(error);
		},

		likePost : function (postId, headers, success, error) {
			var request = {
				method : 'POST',
                headers : headers,
                url : baseUrl + 'Posts/' + postId + '/likes'
			};
			$http(request).success(function (data) {
				success(data);
			}).error(error);
		},

		unlikePost : function (postId, headers, success, error) {
			var request = {
				method : 'DELETE',
                headers : headers,
                url : baseUrl + 'Posts/' + postId + '/likes'
			};
			$http(request).success(function (data) {
				success(data);
			}).error(error);
		},

		getPostComments : function (postId, headers, success, error) {
			var request = {
				method : 'GET',
                headers : headers,
                url : baseUrl + 'posts/' + postId + '/comments'
			};
			$http(request).success(function (data) {
				success(data);
			}).error(error);
		}
	}
});