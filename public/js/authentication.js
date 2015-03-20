//============AUTHENTICATION CONTROLLER============
myApp.controller("MyAuthCtrl", ["$scope","$rootScope","$firebaseAuth","$firebaseObject","$location",
  function($scope, $rootScope, $firebaseAuth, $firebaseObject, $location) {
    var ref = new Firebase("https://incandescent-heat-4286.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);
    	
		//============FACEBOOK AUTHENTICATION SCRIPT============
    	ref.authWithOAuthPopup("facebook", function(error, authData) 
    	{
			if (error) 
			{
				console.log("Login Failed!", error);

				//the function below is necessary to change window location
				$scope.$apply(function() {
					$location.path('/home');
					//console.log($location.path());
				});

			} 
			else 
			{
				//$rootScope.currentUser will hold users' facebook's info
				//$rootScope allows to pass the info to other scopes (controllers)
				$rootScope.currentUser = authData;
				//create this var to refer to the facebok data object (within the scope of this controller only)
				//not necessary but will make code below cleaner (user is shorter than $rootScope.currentUser)
				var user = $rootScope.currentUser;


				//create a new firebase database names 'users' whose children will be the 
				//users' facebook id passed at the end-- so we have /users/whatever_the_user_id_is
				var ref_user = new Firebase("https://incandescent-heat-4286.firebaseio.com/users/" + user.facebook.cachedUserProfile.id);
				
				//create object '$scope.users_info' for the firebase created above that we wil use to store the info we want
				$scope.users_info = $firebaseObject(ref_user);

				$scope.users_info.$loaded()
					.then(function(data)
					{
						console.log($scope.users_info.name);
						console.log(data);

						if($scope.users_info.link===undefined){
						console.log($scope.users_info);

						//create $scope.users_info properties, assigning the facebook info to each of the new properties we create--obs: left hand side is created on the fly and assigned a value from the facebook object we created above
						$scope.users_info.user_name = user.facebook.displayName;
						$scope.users_info.picture = user.facebook.cachedUserProfile.picture.data.url;
						$scope.users_info.link = user.facebook.cachedUserProfile.link;
						$scope.users_info.date = Firebase.ServerValue.TIMESTAMP;

						$rootScope.profileInfo = $scope.users_info;

						console.log('rootScope.userProfile: ', $rootScope.profileInfo);
						
						/*=====BEFORE SAVING THE DATE,FIREBASE WILL CHECK THE ID FOR EACH NEW OBJECT CREATED ON THE LOGIN PROCESS IF THE ID EXISTS (MEANING IF THAT USER ALREADY LOGGED BEFORE) IT DOESN'T CREATE A NEW ID FOR THAT USER AND DOESN'T SAVE THE INFORMATION TWICE!! WE DON'T NEED TO CHECK IF THAT USER US ALREADY IN THE DATABASE EVERY TIME THEY LOG IN!! PRETTY AWESOME!=====*/
						console.log("Authenticated successfully with payload:", authData);
					console.log("User " + authData.uid + " is logged in with " + authData.provider + "name: " + authData.facebook.displayName);
						$scope.users_info.$save();

						//grab username to add to the url: /user/username
						var name = $scope.users_info.user_name;

						//trims out white space from the name that comes from facebook
						//then puts everything to lowercase
						var safeName = name.replace(/ /g,"").toLowerCase();
						$location.path('/user/' + safeName);
						
						} 
						else if ($scope.users_info.user_name) 
						{
							// $scope.switch();
							var name = $scope.users_info.user_name;
							var safeName = name.replace(/ /g,"").toLowerCase();
							$location.path('/user/' + safeName);
							console.log('switch else');
						}
					})//.then
					.catch(function(error) 
					{
				    	console.error("Error:", error);
					});			
		  	}//else
		})//ref.authWithOAuthPopup
  	}//unction($scope, $rootScope, $firebaseAuth, $location)
]);//MyAuthCtrl"