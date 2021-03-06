//============EVENTS CONTROLLER============
myApp.controller("eventsController", ["$scope", "$firebaseArray","$firebaseObject","$firebaseAuth","$rootScope","$location", function($scope, $firebaseArray,$firebaseObject, $firebaseAuth, $rootScope, $location) 
	{	
		//============ANGULAR BOOTSTRAP-UI ACCORDION PROPERTIES============
		$scope.oneAtATime = true;
		$scope.status = {
			isFirstOpen: true,
			isFirstDisabled: false
		};

		//============VARIABLES TO HOLD FIREBASE ROOT URL AND NEW FIREBASE OBJ============
		var firebase_url = "https://incandescent-heat-4286.firebaseio.com";
		var firebase_ref = new Firebase(firebase_url);

		//============CREATE A FIREBASE REFERENCE TO HANDLE MESSAGES============
		var ref = new Firebase(firebase_url + "/messages");
		$scope.messages = $firebaseArray(ref);//create obj as array

		//============CREATE A FIREBASE REFERENCE TO HANDLE EVENTS============
		 var ref_one = new Firebase(firebase_url + "/events");
		 $scope.events = $firebaseArray(ref_one)//create obj as array

		//============CREATE FIREBASE FOR ADMIN AUTHENTICATION============
		var admin_auth = new Firebase(firebase_url + "/admin");
		$scope.admin = $firebaseObject(admin_auth);//create obj 

		//$loaded() is necessary to give my controller time to grab the admin id. 
		//Without $load the id doesn't load on the page
		$scope.admin.$loaded()
			.then(function(data) {
				//get data loaded and assign it to $scope.admin
			   $scope.admin = data; 
			    console.log("admin ID:", $scope.admin.id);
			    
			   //inside the parenthesis on the right hand side of this assignment operator we can put any firebase object
			   $scope.authObj = $firebaseAuth(firebase_ref);

				//============ONAUTH TO MAKE DATA PERSISTENT ON THIS CONTROLLER--doesn't get lost on refresh============
				//authData is the data that comes form facebook authorization
				$scope.authObj.$onAuth(function(authData) {
				  if (authData) {

				  	//$rootScope makes anything it references available globally
				  	$rootScope.currentUser = authData;

				  	$scope.userId = $rootScope.currentUser.facebook.cachedUserProfile.id;

				  	$scope.userName = $rootScope.currentUser.facebook.displayName;

				  	$scope.safeUserame = $scope.userName.replace(/ /g,"").toLowerCase();

				  	console.log('$scope.safeUserame: ', $scope.safeUserame);
				  	
				  	//console.log('userid:', $scope.userId);

				  	var ref_user_points = new Firebase("https://incandescent-heat-4286.firebaseio.com/users/" +$scope.userId);

					console.log("id",$scope.userId);
					
					$rootScope.user = $firebaseObject(ref_user_points);
				  	// console.log("admin ID:", $scope.admin.id);

				  	//check in the console if it is the admin that logged in
				  	if($scope.userId == $scope.admin.id){
				  		$scope.admin_loggedIn=true;
				  		console.log('admin logged in');
				  	}
				  	else{
				  		console.log('you are not an admin');
				  	}

				  }//$scope.authObj
				  else 
				  {
				    console.log("Logged out");

				    //if validation fails redirect users to home page
				    $scope.$apply(function() {
						$location.path('/home');
						//console.log($location.path());
					});
				  }
				});	
				  })
				  .catch(function(error) {
				    console.error("Error:", error);
				 });
		

		$scope.counter=1;
		//============ADD MESSAGE METHOD============
		$scope.addMessage = function(e) {
		    //LISTEN FOR RETURN KEY
		    if (e.keyCode === 13 && $scope.msg) {
			
			//============VARIABLES TO BE PUSHED TO THE MESSAGES ARRAY============
			var user = $rootScope.currentUser;
			var body = $scope.msg;

			//============CONDITION TO ADD POINTS TO USERS WHEN A COMMENT IS MADE============
			if(!$rootScope.user.points){
				$rootScope.user.points = 0;
			} 
			$rootScope.user.points = parseInt($rootScope.user.points) + parseInt($scope.counter);

			//============SAVE POINTS TO USER OBJECT============
			$rootScope.user.$save();

			console.log('$scope.safeUserame', $scope.safeUserame);
			//============ADD TO FIREBASE============
			$scope.messages.$add({
				safename: $scope.safeUserame,
				from: user.facebook.displayName,
				body: body,
				picture: user.facebook.cachedUserProfile.picture.data.url,
				facebook_id: user.facebook.cachedUserProfile.id,
				link: user.facebook.cachedUserProfile.link,
				date: Firebase.ServerValue.TIMESTAMP
			});
		      //============RESET INPUT FIELD============
		      $scope.msg = "";
			}//if statement
		}//function(e)

		//initialize objects to give angularfire a heads up they are coming next. 
		//this allows angular to load the values of these objects' properties
		$scope.new_event = {};
		$scope.day_selected = {};


		//============ADD EVENT METHOD============
		$scope.addEvent = function(e) {
		    console.log('in the add function');
			console.log('day selected', $scope.new_event.day_selected);
			  
			var ref_two = new Firebase("https://incandescent-heat-4286.firebaseio.com/events/" + $scope.new_event.day_selected);
			console.log('events:', $scope.day_selected);
			$scope.day_events = $firebaseArray(ref_two);


			// console.log($scope.new_event);
			console.log($scope.day_events);
			console.log('new event obj: ', $scope.new_event);
			
		     //============ADD DATA TO FIREBASE============ 
		     //only allow users to create 5 events - Mon through Fri
		     //display notice if they try to enter more events
			if($scope.day_events.length <= 4)
			{
				$scope.day_events.$add($scope.new_event);
			}
			else
			{
				$scope.notice = "You cannot add events for more than 5 days. You may edit current events or delete them.";
			}
			//============RESET INPUT FIELDS============
			$scope.new_event = {};
		}//function(e)
	}//controller function
]);//events controller
