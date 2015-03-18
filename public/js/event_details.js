
myApp.controller("detailsController",["$scope", "$routeParams", "$firebaseObject", function($scope, $routeParams, $firebaseObject){
	var ref_three = new Firebase("https://incandescent-heat-4286.firebaseio.com/events/" + $routeParams.eventDay+ "/" + $routeParams.eventDetails );
	$scope.event_details = $firebaseObject(ref_three);
	// console.log('event details:', $routeParams.eventDetails);
	}
]);