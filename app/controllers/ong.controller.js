export default class OngController {
	constructor($rootScope, $scope, $resource, $timeout, $filter, $routeParams, $mdDialog) {
		$scope.ongResource = {};
		$scope.ongEvents = [];
		$scope.ongVolunteers = [];

		var id = $routeParams.id;
		var urlOng = urlContext + "/ongs/" + id;
		var urlOngEvents = urlOng + "/events";
		var urlOngVolunteers = urlOng + "/volunteers"
		var p=0, s=5;

		var Ong = $resource(urlOng);
		var OngEvents = $resource(urlOngEvents);
		var OngVolunteers = $resource(urlOngVolunteers);

		$scope.ongResource = Ong.get();

		OngEvents.get().$promise.then(function(response) {
			angular.forEach(response.content, function(eventResource, key) {
				$scope.ongEvents.push(eventResource);
			});
		});

		OngEvents.get().$promise.then(function(response) {
			angular.forEach(response.content, function(eventResource, key) {
				$scope.ongEvents.push(eventResource);
			});
		});

		OngVolunteers.get({page: p, size: s}).$promise.then(function(response) {
			angular.forEach(response.content, function(volunteerResource, key) {
				$scope.ongVolunteers.push(volunteerResource);
			});
			p++;
		});

		$scope.showConfirm = function(ev) {
		    var confirm = $mdDialog.confirm()
		      .title('¿Quieres unirte a esta causa?')
		      .content('Tu ayuda es muy apreciada')
		      .ariaLabel('Enviar solicitud')
		      .ok('Claro que si!')
		      .cancel('No, lo siento')
		      .disableParentScroll(false)
		      .targetEvent(ev);
		    console.log(confirm);
		    $mdDialog.show(confirm).then(function() {
		      $scope.alert = 'You decided to get rid of your debt.';
		    }, function() {
		      $scope.alert = 'You decided to keep your debt.';
		    });
		  };

		$scope.save = function(ong) {
			var ongObj = new Ong();
			console.log(ongObj);
		};

		var Ong = $resource("/Voluntarios/ongs/:ong", {ong: "@ong"});

		$scope.createOng = function(ong) {
			console.log(ong)
			console.log("asdas");
		}

		//temp
		var randomId = Math.floor(Math.random() * 10);
		$scope.randomPhoto = "https://randomuser.me/api/portraits/thumb/lego/"+randomId+".jpg";
	}
}
