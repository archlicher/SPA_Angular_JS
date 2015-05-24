'use strict';

SocialNetwork.factory('friendService', function ($http, baseUrl){
	return {
        getFriendWallPages : function (username, page, headers, success, error) {
            var request = {
                method : 'GET',
                headers : headers,
                url : baseUrl + 'users/' + username + '/wall?StartPostId=&PageSize='+page
            };
            $http(request).success(function (data) {
                sessionStorage['friendsWallByPage'] = JSON.stringify(data);
                success(data);
            }).error(error);   
        },

        getFriendsDetailFriendsList : function (username, headers, error) {
        	var request = {
                method : 'GET',
                headers : headers,
                url : baseUrl + 'users/' + username + '/friends'
            };
            $http(request).success(function (data) {
                sessionStorage['friendsList'] = JSON.stringify(data);
            }).error(error);
        },

        getFriendsPreview : function (username, headers, success, error) {
            var request = {
                method : 'GET',
                headers : headers,
                url : baseUrl + 'users/' + username + '/friends/preview'
            };
            $http(request).success(function (data) {
                sessionStorage['friendsPreview'] = JSON.stringify(data);
                success(data);
            }).error(error);
        },

        getFriendsFromUserStorage : function () {
            var friends = sessionStorage['friendsList'];
            if (friends) {
                return JSON.parse(sessionStorage['friendsList']);
            }
        }
	}
});