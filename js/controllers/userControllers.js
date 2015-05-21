'use strict';

SocialNetwork.controller('UserController', function($scope, $location, userRestService, notify){
	$scope.userRestService = userRestService;

	$scope.logout = function () {
		userRestService.logout();
		$location.path('/logout');
		notify.showInfo('Successful logout.');
		$location.path('/');
	}
});