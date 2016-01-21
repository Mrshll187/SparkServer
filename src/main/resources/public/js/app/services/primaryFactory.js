app.factory('primaryFactory', ['$http', function($http) {
    
    var upload = function (payload, userKey){
    	
    	var formData = new FormData();
    	formData.append('file', payload);
    	
	    return $http.post('/upload/'+userKey, formData, {
	        headers: {'Content-Type': undefined },
	        transformRequest: angular.identity
	    });
    };
    
    var shareFile = function (payload, userKey) {
    	return $http.post('/shareFile/'+userKey, payload);
    };
    
    var removeFile = function (payload, userKey) {
    	return $http.post('/removeFile/'+userKey, payload);
    };
    
    var removeUser = function (payload, userKey) {
    	return $http.post('/removeUser/'+userKey, payload);
    };
    
    var getFiles = function (userKey) {
    	return $http.get('/getFiles/'+userKey);
    };
    
    var searchUser = function (userId) {
    	return $http.get('/whoIs/'+userId);
    };
    
    var getUsers = function (userKey) {
    	return $http.get('/getUsers/'+userKey);
    };
    
    var getTotalDiskSpace = function (userKey) {
    	return $http.get('/getTotalDiskSpace/'+userKey);
    };

    var login = function(payload){
    	return $http.post('/login', payload);
    };
    
    var logout = function (payload) {
    	return $http.post('/logout', payload);
    };
    
    var approve = function(payload, userKey) {
    	return $http.post('/approve/'+userKey, payload);
    };
    
    var register = function(payload){
    	return $http.post('/register', payload);
    };
    
    return {
    	login : login,
    	logout : logout,
    	register : register,
    	upload : upload,
    	removeFile : removeFile,
    	shareFile : shareFile,
    	removeUser : removeUser,
    	approve : approve,
    	getFiles : getFiles,
    	getUsers : getUsers,
    	searchUser : searchUser,
    	getTotalDiskSpace : getTotalDiskSpace
    };
    
}]);