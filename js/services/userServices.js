'use strict';

SocialNetwork.factory('userRestService', function ($http, baseUrl){
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
                url : baseUrl+'/users/register',
                data : registerData
            };
            $http(request).success(function (data) {
                sessionStorage['currentUser'] = JSON.stringify(data);
                success(data);
            }).error(error);
        },

        logout : function () {
            var request = {
                method : 'POST',
                url : baseUrl+'users/logout'
            };
            $http(request).success(function () {
                delete sessionStorage['currentUser'];
            }).error(error);
        },

        editProfile : function (profileData, success, error) {
            var request = {
                method : 'PUT',
                url : baseUrl + 'me',
                data : profileData
            };
            $http(request).success(function (data) {
                success(data);
            }).error(error);
        },

        getUserPreview : function (success, error) {
            var request = {
                method : 'GET',
                url : baseUrl + sessionStorage['currentUser'].username + '/preview';
            };
            $http(request).success(function (data) {
                success(data);
            }).error(error);
        },

        getUserData : function (success, error) {
            var request = {
                method : 'GET',
                url : baseUrl + sessionStorage['currentUser'].username
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

        isUserLogged : function() {
            var currentUser = this.getCurrentUser();
            return currentUser!= undefined;
        },

        getHeaders : function() {
            var headers = {};
            var currentUser = this.getCurrentUser();
            if (currentUser) {
                headers['Authorization'] = 'Bearer' + currentUser.access_token;
            }
            return headers;
        }
    };
});