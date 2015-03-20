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
		  	console.log('$scope.user.facebook.cachedUserProfile.id:', $scope.user.facebook);

		  	//firebase object
		  		var ref_user = new Firebase("https://incandescent-heat-4286.firebaseio.com/users/" + $scope.user.facebook.cachedUserProfile.id);
		  		$scope.user_profile_data = $firebaseObject(ref_user);
		  		
		  	
		  	$scope.addUserInfo = function(e) {
		  		// console.log($scope.user_profile_info.about);

		  		//build firebase object; create keys 'age', 'major', and 'about' and assign the values to whatever the user passed in the input field
		  		$scope.user_profile_data.age = $scope.user_profile_info.age;
		  		$scope.user_profile_data.major = $scope.user_profile_info.major;
		  		$scope.user_profile_data.location = $scope.user_profile_info.location;
		  		$scope.user_profile_data.facebook = $scope.user_profile_info.facebook;
		  		$scope.user_profile_data.twitter = $scope.user_profile_info.twitter;
		  		$scope.user_profile_data.linkedin = $scope.user_profile_info.linkedin;
		  		$scope.user_profile_data.email = $scope.user_profile_info.email;
		  		$scope.user_profile_data.lookingForwardTo = $scope.user_profile_info.lookingForwardTo;
		  		$scope.user_profile_data.about = $scope.user_profile_info.about;

		  		$scope.user_profile_data.$save();
		  		
		  		//clear input field
		  		$scope.user_profile_info.age = "";
		  		$scope.user_profile_info.major = "";
		  		$scope.user_profile_info.location = "";
		  		$scope.user_profile_info.facebook = "";
		  		$scope.user_profile_info.twitter = "";
		  		$scope.user_profile_info.linkedin = "";
		  		$scope.user_profile_info.email = "";
		  		$scope.user_profile_info.lookingForwardTo = "";
		  		$scope.user_profile_info.about = "";
		  	}

		  }//if (authData) 
		  else 
		  {
		    console.log("Logged out");
		  }
		});//$scope.authObj.$onAuth
	}//usersController function
]);//usersController
