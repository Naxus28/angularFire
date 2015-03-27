
myApp.controller("detailsController",["$scope", "$routeParams", "$firebaseObject", function($scope, $routeParams, $firebaseObject){
	
	//============CREATE FIREBASE OBJECT BASED ON THE DAY AND EVENT ID, WHICH IDENTIFIES THE SPECIFIC EVENT WITHIN THAT DAY  i.e. URL: https://incandescent-heat-4286.firebaseio.com/events/monday/id-1; https://incandescent-heat-4286.firebaseio.com/events/monday/id-2, etc ============
	var ref_three = new Firebase("https://incandescent-heat-4286.firebaseio.com/events/" + $routeParams.eventDay+ "/" + $routeParams.eventDetails );
	$scope.event_details = $firebaseObject(ref_three);
	}
]);