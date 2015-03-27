myApp.controller("usersController", ["$scope","$rootScope","$firebaseObject","$firebaseArray","$firebaseAuth", function($scope, $rootScope, $firebaseObject,$firebaseArray, $firebaseAuth)
	{
		//============VARIABLES TO HOLD FIREBASE ROOT URL AND NEW FIREBASE OBJ============
		var firebase_url = "https://incandescent-heat-4286.firebaseio.com";
		var firebase_ref = new Firebase(firebase_url);
		$scope.authObj = $firebaseAuth(firebase_ref);

		//authObj.$onAuth makes data persistent on this controller
		$scope.authObj.$onAuth(function(authData) {
		  if (authData) 
		  {
		  	$rootScope.profileInfo = authData;
		  	$scope.user = $rootScope.profileInfo;
		  	$rootScope.user = $rootScope.profileInfo;
		  	console.log('$scope.user.facebook.cachedUserProfile.id:', $scope.user.facebook.id);

		  	// $rootScope.userName = $scope.user.facebook.displayName.replace(/ /g,"").toLowerCase();

	  		// console.log('$rootScope.userName: ', $rootScope.userName);

	  		//firebase object
	  		var ref_user = new Firebase("https://incandescent-heat-4286.firebaseio.com/users/" + $scope.user.facebook.cachedUserProfile.id);
	  		$scope.user_profile_data = $firebaseObject(ref_user);

	 		console.log('$scope.user_profile_data: ', $scope.user_profile_data.$id);

	 		$scope.user_profile_data.$loaded().
	 		then(function(data){
	 			console.log('data: ',data.user_name.replace(/ /g,"").toLowerCase());
	 			$rootScope.userName = data.user_name.replace(/ /g,"").toLowerCase();
	 		});
	 		console.log('$scope.user_profile_data: ', $scope.user_profile_data);
		  	//============ADD/UPDATE USER INFO METHOD============
		  	//adds new info when user submits form
		  	//this allows for create and update functionalities
		  	$scope.addUserInfo = function(e) {
		  		//save to firebase
		  		$scope.user_profile_data.$save();
		  	}
		  }//if (authData) 
		  else 
		  {
		    console.log("Logged out");  
			}
		});//$scope.authObj.$onAuth
	}//usersController function
]);//usersController
