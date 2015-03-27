
myApp.controller("usersVisitController",["$scope","$rootScope","$routeParams", "$firebaseObject","$firebaseAuth","$firebaseArray", function($scope, $rootScope, $routeParams, $firebaseObject, $firebaseAuth, $firebaseArray){
	
	//============CREATE FIREBASE OBJECT BASED ON THE DAY AND EVENT ID, WHICH IDENTIFIES THE SPECIFIC EVENT WITHIN THAT DAY  i.e. URL: https://incandescent-heat-4286.firebaseio.com/events/monday/id-1; https://incandescent-heat-4286.firebaseio.com/events/monday/id-2, etc ============
	
	//visited user profile object
	var ref_visits = new Firebase("https://incandescent-heat-4286.firebaseio.com/users/" + $routeParams.userVisit);
	$scope.user_profile_data = $firebaseObject(ref_visits);

	//logged in user profile object
	var firebase_ref = new Firebase("https://incandescent-heat-4286.firebaseio.com");
	$scope.authObj = $firebaseAuth(firebase_ref);


	console.log('$scope.user_profile_data: ', $scope.user_profile_data);
	// console.log('$scope.user: ', $scope.authObj);

	//authObj.$onAuth makes data persistent on this controller
		$scope.authObj.$onAuth(function(authData) {
		  if (authData) 
		  {
		  	console.log(authData);
		  	$rootScope.user = authData;
		  	console.log('$rootScope.user: ', $rootScope.user);
		  	console.log('authData: ', $rootScope.user.facebook.displayName);
		  	$rootScope.userName = $rootScope.user.facebook.displayName.replace(/ /g,"").toLowerCase()
		  	
		  	// authData.$loaded().
			  // 	then(function(data){
			  		// console.log('data: ',$rootScope.user.facebook.displayName.replace(/ /g,"").toLowerCase());
			  		$rootScope.userName = $rootScope.user.facebook.displayName.replace(/ /g,"").toLowerCase();
		  		// });

	  		
	  		console.log($scope.user.facebook.cachedUserProfile.id);
	  		//============ADD EVENT METHOD============
		$scope.addFriend = function(e) {
		    console.log('in the add function');
			// console.log('day selected', $scope.new_event.day_selected);
			  
			var ref_user = new Firebase("https://incandescent-heat-4286.firebaseio.com/users/" + $scope.user.facebook.cachedUserProfile.id + "/friends");
	  		$scope.user_friends = $firebaseArray(ref_user);

	  		$scope.user_friends.name = $scope.user_profile_data.user_name;
	  		$scope.user_friends.picture = $scope.user_profile_data.picture;
	  		$scope.user_friends.link_id = $scope.user_profile_data.$id;


	  		console.log('$scope.user_friends:', $scope.user_friends);
	  		
	  		  
	  		$scope.user_friends.$add($scope.user_friends);
			//============RESET INPUT FIELDS============
			$scope.new_event = {};
		}//function(e)
	  	 	

	 		 // console.log('$scope.user: ', $scope.user);



	 		
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