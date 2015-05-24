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
                sessionStorage.clear();
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
                delete sessionStorage['myWallData'];
                delete sessionStorage['friendRequests'];
                success();
            }).error(error);
        },

        changePassword : function (password, success, error) {
            var request = {
                method : 'PUT',
                url : baseUrl + 'me/changepassword',
                headers : this.getHeaders(),
                data : password
            };
            $http(request).success(function (data) {
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
                success();
            }).error(error);
        },

        getMyFriends : function () {
            delete sessionStorage['myFriends'];
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + 'me/friends'
            };
            $http(request).success(function (data) {
                sessionStorage['myFriends'] = JSON.stringify(data);
            }).error();
        },

        getFriendRequest : function (success, error) {
            delete sessionStorage['friendRequests'];
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + 'me/requests'
            };
            $http(request).success(function (data) {
                sessionStorage['friendRequests'] = JSON.stringify(data);
                success(data);
            }).error(error);
        },

        sendFriendRequest : function (user, success, error) {
            var request = {
                method : 'POST',
                headers : this.getHeaders(),
                url : baseUrl + 'me/requests/' + user
            };
            $http(request).success(function (data) {
                success();
            }).error(error);
        },

        aproveFriendRequest : function (requestId, success, error) {
            var request = {
                method : 'PUT',
                headers : this.getHeaders(),
                url : baseUrl + 'me/requests/' + requestId + '?status=approved'
            };
            $http(request).success(function (data) {
                success();
            }).error(error);
        },

        rejectFriendRequest : function (requestId, success, error) {
            var request = {
                method : 'PUT',
                headers : this.getHeaders(),
                url : baseUrl + 'me/requests/' + requestId + '?status=rejected'
            };
            $http(request).success(function (data) {
                success();
            }).error(error);
        },

        getUserPreview : function (username, success, error) { //for posts of friends param 'username' is user to get
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

        searchUsersByName : function (name, success, error) {
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + 'users/search?searchTerm=' + name
            };
            $http(request).success(function (data) {
                sessionStorage['usersByName'] = JSON.stringify(data);
                success(data);
            }).error(error);  
        },

        getUserData : function (username, success, error) { // for friend's home page param 'username' is user to get
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + 'users/' + username
            };
            $http(request).success(function (data) {
                sessionStorage['userData'] = JSON.stringify(data);
                success();
            }).error(error);
        },

        getNewsFeed : function (pageSize, success, error) { //newsfeed for pagination
            var request = {
                method : 'GET',
                headers : this.getHeaders(),
                url : baseUrl + 'me/feed?StartPostId=&PageSize=' + pageSize
            };
            $http(request).success(function (data) {
                sessionStorage['newsfeed'] = JSON.stringify(data);
                success(data);
            }).error(error);
        },

        getCurrentUser : function () {
            var user = sessionStorage['currentUser'];
            if (user) {
                return JSON.parse(sessionStorage['currentUser']);
            }
        },

        getMyWallFromStorage : function () {
            var wall = sessionStorage['myWallData'];
            if (wall) {
                return JSON.parse(sessionStorage['myWallData']);
            }
        },

        getMyFriendRequests : function () {
            var requests = sessionStorage['friendRequests'];
            if (requests) {
                return JSON.parse(sessionStorage['friendRequests']);
            }
        },

        hasFriendRequest : function () {
            var requests = JSON.parse(sessionStorage['friendRequests']);
            if (requests.length > 0) {
                return true;
            }
            return false;
        },

        getMyFriendsFromStorage : function () {
            var friedns = sessionStorage['myFriends'];
            if (friedns) {
                return JSON.parse(sessionStorage['myFriends'])
            }
        },

        getUserFromStorage : function () {
            var user = sessionStorage['userData'];
            if (user) {
                return JSON.parse(sessionStorage['userData']);
            }
        },

        getNewsfeedFromStorage : function () {
            var news = sessionStorage['newsfeed'];
            if (news) {
                return JSON.parse(sessionStorage['newsfeed']);
            }
        },

        isUserLogged : function() {
            var currentUser = this.getCurrentUser();
            return currentUser!= undefined;
        },

        getFoundUsers : function () {
            var users = sessionStorage['foundUsers'];
            if (users) {
                return JSON.parse(sessionStorage['foundUsers']);
            }
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