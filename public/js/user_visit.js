
myApp.controller("usersVisitController",["$scope","$rootScope","$routeParams", "$firebaseObject","$firebaseAuth", function($scope, $rootScope, $routeParams, $firebaseObject, $firebaseAuth){
	
	//============CREATE FIREBASE OBJECT BASED ON THE DAY AND EVENT ID, WHICH IDENTIFIES THE SPECIFIC EVENT WITHIN THAT DAY  i.e. URL: https://incandescent-heat-4286.firebaseio.com/events/monday/id-1; https://incandescent-heat-4286.firebaseio.com/events/monday/id-2, etc ============
	var ref_visits = new Firebase("https://incandescent-heat-4286.firebaseio.com/users/" + $routeParams.userVisit);
	$scope.user_profile_data = $firebaseObject(ref_visits);

	var firebase_url = "https://incandescent-heat-4286.firebaseio.com";
	var firebase_ref = new Firebase(firebase_url);
	$scope.authObj = $firebaseAuth(firebase_ref);


	console.log('$scope.user_profile_data: ', $scope.user_profile_data);
	console.log('$scope.user: ', $scope.authObj);

	//authObj.$onAuth makes data persistent on this controller
		$scope.authObj.$onAuth(function(authData) {
		  if (authData) 
		  {
		  	console.log(authData);
		  	$rootScope.user = authData;
		  	console.log('$rootScope.user: ', $rootScope.user);
		  	console.log('authData: ', $rootScope.user.facebook.displayName);
		  	$rootScope.userName = $rootScope.user.facebook.displayName.replace(/ /g,"").toLowerCase()
		  	
		  	$rootScope.user.$loaded().
			  	then(function(data){
			  		console.log('data: ',$rootScope.user.facebook.displayName.replace(/ /g,"").toLowerCase());
			  		$rootScope.userName = $rootScope.user.facebook.displayName.replace(/ /g,"").toLowerCase();
		  		});
		  	// console.log('$scope.user.facebook.cachedUserProfile.id:', $scope.user.facebook.id);

	  		//firebase object
	  	//  	var ref_user = new Firebase("https://incandescent-heat-4286.firebaseio.com/users/" + $scope.user.facebook.cachedUserProfile.id);
	  	// 	$scope.user_profile_data = $firebaseObject(ref_user);

	 		//  console.log('$scope.user_profile_data: ', $scope.user_profile_data.$id);

	 		
	 		// console.log('$scope.user_profile_data: ', $scope.user_profile_data);
		  	//============ADD/UPDATE USER INFO METHOD============
		  	//adds new info when user submits form
		  	//this allows for create and update functionalities
		  	// $scope.addUserInfo = function(e) {
		  	// 	//save to firebase
		  	// 	$scope.user_profile_data.$save();
		  	// }
		  }//if (authData) 
		  else 
		  {
		    // console.log("Logged out");  
			}
		});//$scope.authObj.$onAuth
	}
]);