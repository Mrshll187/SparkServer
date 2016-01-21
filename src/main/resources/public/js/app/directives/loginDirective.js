app.directive('loginmodal', ['primaryFactory', '$timeout', '$rootScope', function (primaryFactory, $timeout, $rootScope) {
	
	return {
	    
		restrict: 'E',
	    transclude: true,
	    replace:true,
	    scope:true,
	    templateUrl: '/js/app/views/login.html',	   
	    link: function postLink(scope, element, attrs) {
    
	    	scope.user = undefined;
	    	scope.password = undefined;
	    	scope.admin = undefined;
	    	scope.userKey = undefined;
	    	scope.result = undefined;
	    	
	        scope.$watch(attrs.visible, function(value){
	          
	        	if(value == true)
	        		$(element).modal('show');
	        	else
	        		$(element).modal('hide');
	        });
	
	        $(element).on('shown.bs.modal', function(){
	        	
	        	scope.$apply(function(){
	        		clearForm();
	        		scope.$parent[attrs.visible] = true;
		        });
	        });
	
	        $(element).on('hidden.bs.modal', function(){
	        	
	        	scope.$apply(function(){
	        		scope.$parent[attrs.visible] = false;
		        });
	        });
	        
	        scope.submit = function(){
	        	
	        	var payload = {
        			user : scope.user, 
        			password : scope.password
	        	};
	        	
	        	primaryFactory.login(payload).success(function (data) {
	    			
	    			scope.result = data;
	    			
	    			autoCloseModal(data.success);
	    			autoCloseAlert();
	    			
	    			acknowledge(data.success, scope.user, data.userKey, data.admin);
	        	});
	        };
	        
	        var autoCloseModal = function(success){
	            
	        	if(success===false)
	        		return;
	        	
	        	$timeout(function(){
	        		
	        		$(element).modal('hide');
	            }, 500);
	        };
	        
	        var autoCloseAlert = function(){
	            
	        	$timeout(function(){
	        		
	        		scope.result = undefined;
	            }, 1000);
	        };
	        
	        var acknowledge = function(success, user, userKey, admin){

	        	if(success===false)
	        		return;
	        	
	        	$rootScope.$broadcast('user-login', {
	        		
	        		user : scope.user,
	        		userKey : userKey,
	        		admin : admin
	        	});
	        };
	        
	        var clearForm = function(){
	        	
		    	scope.user = undefined;
		    	scope.password = undefined;
		    	scope.userKey = undefined;
		    	scope.result = undefined;
	        };
	        
	    	$rootScope.$on('user-logout', function (event, args) {
	    		clearForm();
	    	});
	    
	        scope.register = function(){
	        	
	        	var payload = {
        			user : scope.user, 
        			password : scope.password
	        	};
	        	
	        	primaryFactory.register(payload).success(function (data) {
	    			
	    			scope.result = data;
	    			
	    			autoCloseModal(data.success);
	    			acknowledge(data.success, scope.user, data.userKey, false);
	        	});
	        };
	    }
	};
}]);