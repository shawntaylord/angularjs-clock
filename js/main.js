var clockApp = angular.module("clockApp", []);

clockApp.directive('display', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/dateDisplay.html'
	}
});

clockApp.directive('clock', function() {
	return {
		restrict: 'E',
		templateUrl: 'partials/clockDisplay.html'
	}
});

clockApp.controller('DateCtrl', function($scope) {

	var datetime = new Date();
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
	                  'August', 'September', 'October', 'November', 'December']
	var dateNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	/* Clock Hands */
	$scope.minuteHand = 0;
	$scope.hourHand = 0;
	$scope.secondHand = 0;

	/* Create seconds tick spacing */
	$scope.minorLines = [];
	var ignore = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
	for(i=0; i <= 360; i+=6) {
		if(ignore.indexOf(i) == -1) {
			$scope.minorLines.push(i);
		}
	}
	
	/* Create hours tick spacing */
	$scope.majorLines = [];
	for(i = 0; i<= 360; i += 30) {
		$scope.majorLines.push(i);
	}

	/* Updates Time in View */
	var updateTime = function() {
		$scope.$apply(function() {
			var datetime = new Date();

			/* Determines placement of each hand at every second */
			$scope.secondHand = 6*datetime.getSeconds();
			$scope.minuteHand = 6*(datetime.getMinutes() + (datetime.getSeconds() / 60));
			$scope.hourHand = 30*(datetime.getHours() + (datetime.getMinutes() / 60));

			/* Updates time display */
			$scope.timeOfDay = datetime.getTime();

			/* Updates date display */
			$scope.month = monthNames[datetime.getMonth() - 1];
			$scope.dayOfWeek = dateNames[datetime.getDay() -1];
			$scope.date = datetime.getDate();
			$scope.year = datetime.getFullYear();
		})	
	}

	$(document).ready(function() {
		updateTime(); // Runs in the time before setInterval takes effect
		setInterval(updateTime, 1000); // Runs updateTime() every second, forever
	});
});

