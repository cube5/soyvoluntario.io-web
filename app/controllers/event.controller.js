export default class EventController {
	constructor($rootScope, $scope, $resource, $timeout, $mdSidenav, $route, $routeParams, $location, $filter) {
		console.log("Event Ctrl");
		const API_URL = 'http://localhost:3000/api/';
		var randomTheme = function() {
    	var themes = ['blueGreyTheme', 'tealTheme', 'indigoTheme', 'cyanTheme',
    	              'pinkTheme', 'purpleTheme', 'deepOrangeTheme',
    	              'deepPurpleTheme', 'amberTheme', 'greenTheme'];

    	return themes[Math.floor(Math.random() * themes.length)];
    };

		var Event = $resource(API_URL+'events/:id', {id: '@id'});
		// var event = Event.get({ id: 1 });
		$scope.events = Event.query();
		$scope.isLoadingEvent = false;

		$scope.loadMore = function() {
			$scope.isLoadingEvents = true;
			$scope.dynamicTheme = randomTheme();

			Event.query().$promise.then(function(response) {
				angular.forEach(response.content, function(eventResource, key) {
					$scope.events.push(eventResource);
				});
				$scope.isLoadingEvents = false;
			});
		};

		// EventVolunteers.get().$promise.then(function(response) {
		// 	angular.forEach(response.content, function(eventResource, key) {
		// 		$scope.eventVolunteers.push(eventResource);
		// 	});
		// });

		//temp
		var randomId = Math.floor(Math.random() * 10);
		$scope.randomPhoto = "https://randomuser.me/api/portraits/med/lego/"+randomId+".jpg";

		$scope.loadMore();
	}
}
