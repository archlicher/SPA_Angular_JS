'use strict';

SocialNetwork.factory('commentService', function ($http, baseUrl){
	return {
		addCommentToPost : function (data, headers, success, error) {
			var request = {
				method : 'POST',
                headers : headers,
                url : baseUrl + 'posts/' + data.postId + '/comments',
                data : data.commentContent
			};
			$http(request).success(function (data) {
				success();
			}).error(error);
		},

		editComment : function (data, headers, success, error) {
			var request = {
				method : 'PUT',
                headers : headers,
                url : baseUrl + 'posts/' + data.postId + '/comments/' + data.commentId,
                data : data.commentContent
			};
			$http(request).success(function (data) {
				success();
			}).error(error);
		},

		deleteComment : function (data, headers, success, error) {
			var request = {
				method : 'DELETE',
                headers : headers,
                url : baseUrl + 'posts/' + data.postId + '/comments/' + data.commentId
			};
			$http(request).success(function (data) {
				success();
			}).error(error);
		},

		getCommentDetailedLikes : function (data, headers, success, error) {
			var request = {
				method : 'GET',
                headers : headers,
                url : baseUrl + 'posts/' + data.postId + '/comments/' + data.commentId + '/likes'
			};
			$http(request).success(function (data) {
				success();
			}).error(error);
		},

		getCommentLikes : function (data, headers, success, error) {
			var request = {
				method : 'GET',
                headers : headers,
                url : baseUrl + 'posts/' + data.postId + '/comments/' + data.commentId + '/likes/preview'
			};
			$http(request).success(function (data) {
				success();
			}).error(error);
		},

		likeComment : function (data, headers, success, error) {
			var request = {
				method : 'POST',
                headers : headers,
                url : baseUrl + 'posts/' + data.postId + '/comments/' + data.commentId + '/likes'
			};
			$http(request).success(function (data) {
				success();
			}).error(error);
		},

		unlikeComment : function (data, headers, success, error) {
			var request = {
				method : 'DELETE',
                headers : headers,
                url : baseUrl + 'posts/' + data.postId + '/comments/' + data.commentId + '/likes'
			};
			$http(request).success(function (data) {
				success();
			}).error(error);
		}
	}
});