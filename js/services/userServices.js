'use strict';

SocialNetwork.factory('userService', function ($http, baseUrl){
	return {
        login : function (loginData, success, error) {
            var request = {
                method : 'POST',
                url : baseUrl+'/users/login',
                data : loginData
            };
            $http(request).success(function (data) {
                sessionStorage['currentUser'] = JSON.stringify(data);
                success(data);
            }).error(error);
        },

        register : function (registerData, success, error) {
            var request = {
                method : 'POST',
                url : baseUrl + 'users/register',
                data : registerData
            };
            $http(request).success(function (data) {
                sessionStorage['currentUser'] = JSON.stringify(data);
                success(data);
            }).error(error);
        },

        logout : function (success, error) {
            var request = {
                method : 'POST',
                url : baseUrl+'users/logout',
                headers : this.getHeaders()
            };
            $http(request).success(function () {
                delete sessionStorage['currentUser'];
                delete sessionStorage['userData'];
                success();
            }).error(error);
        },

        editProfile : function (profileData, success, error) {
            var request = {
                method : 'PUT',
                url : baseUrl + 'me',
                headers : this.getHeaders(),
                data : profileData
            };
            $http(request).success(function (data) {
                success(data);
            }).error(error);
        },

        getUserPreview : function (username, success, error) {
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + 'users/' + username + '/preview'
            };
            $http(request).success(function (data) {
                sessionStorage['userData'] = JSON.stringify(data);
                success(data);
            }).error(error);
        },

        getMyWallData : function (success, error) {
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + 'me'
            };
            $http(request).success(function (data) {
                sessionStorage['myWallData'] = JSON.stringify(data);
                success(data);
            }).error(error);
        },

        getFriendRequest : function (success, error) {
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + 'me/requests'
            };
            $http(request).success(function (data) {
                sessionStorage['friendRequests'] = JSON.stringify(data);
                success();
            }).error(error);
        },

        getUserData : function (username, success, error) {
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + username
            };
            $http(request).success(function (data) {
                success(data);
            }).error(error);
        },

        getCurrentUser : function() {
            var user = sessionStorage['currentUser'];
            if (user) {
                return JSON.parse(sessionStorage['currentUser']);
            }
        },

        pendingRequests : function  (argument) {
            var pendRequests = sessionStorage['friendRequests'];
            if (pendRequests) {
                return JSON.parse(sessionStorage['friendRequests']);
            }
        },

        getUserData : function () {
            var user = sessionStorage['userData'];
            if (user) {
                return JSON.parse(sessionStorage['userData']);
            }
        },

        isUserLogged : function() {
            var currentUser = this.getCurrentUser();
            return currentUser!= undefined;
        },

        getHeaders : function() {
            var headers = {};
            var currentUser = this.getCurrentUser();
            if (currentUser) {
                headers['Authorization'] = 'Bearer ' + currentUser.access_token;
            }
            return headers;
        }
    };
});