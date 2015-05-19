'use strict';

SocialNetwork.factory('restService', function($http, baseUrl){
	var service = {};

	var serviceUrl = baseUrl + '/user';

	service.Login = function (loginData, success, error) {
		$http.post(serviceUrl+'/login', loginData)
			.success(function (data, status, headers, config) {
				success(data);
			}).error(error);
	}

	service.SetUserToStorage = function (serverData) {
        localStorage['accessToken'] = serverData.access_token;
        localStorage['username'] = serverData.userName;
        localStorage['isUserLogged'] = true;
    };

    service.GetHeaders = function () {
    	return 'Bearer'+localStorage['accessToken'];
    }

    service.isUserLogedIn = function () {
    	return localStorage['isUserLogged'];
    }

	return service;
});