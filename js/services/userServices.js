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
            delete sessionStorage['currentUser'];
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