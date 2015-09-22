export default class MainController {
	constructor($scope, $mdSidenav) {
		console.log('main ctrl');
		$scope.signInUrl = "#/login";
		$scope.registerUrl = "#/register";
		$scope.ongsUrl = "#/ongs";
		$scope.eventsUrl = "#/events";
		$scope.ongNewUrl = "#/ongs/new";

		this.showSidenav = function() {
			$mdSidenav('snLeft').toggle();
		};
	}
}
