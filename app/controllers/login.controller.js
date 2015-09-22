export default class LoginController {
	constructor($rootScope, $http, $location, $mdToast, $mdSidenav,
	$mdDialog, UserFactory) {
		console.log("LoginCtrl");
		var login = this;
		login.user = null;
		login.credentials = {};
		login.randomPhotoThumb = "https://randomuser.me/api/portraits/thumb/lego/"+
			Math.floor(Math.random() * 10)+".jpg";

		login.openMenu = function($mdOpenMenu, ev) {
			console.log('open menu');
      $mdOpenMenu(ev);
    };

		login.login = function() {
			UserFactory.login(login.credentials.username, login.credentials.password)
			.then(function success(response) {
				login.user = response.data.user;
				$mdToast.show({
					template:
						'<md-toast class="md-capsule" layout="row" layout-align="space-around">'+
							'Bienvenido '+
							'<img src="'+ login.randomPhotoThumb +'" class="face-toolbar"/>'+
							login.user.username+
						'</md-toast>',
					hideDelay: 3000,
					position: 'top right',
					parent: angular.element(document.getElementById('login'))
				});
				// $location.path('#/events');
			}, handleError);

		function handleError(response) {
      console.log("Error:  " + response.data);
			var toast = $mdToast.simple()
				.content(response.data||'Hubo un problema con la autenticaci&oacute;n, intente de nuevo')
				.action('OK')
				.highlightAction(true)
				.position('top right');
			$mdToast.show(toast);
      }
		};

// 		var authenticate = function(credentials, callback) {
// 			var username = credentials ? credentials.username : "";
// 			var headers = credentials ? {authorization: "Basic "
// 				+ btoa(credentials.username + ":" + credentials.password)
// 			} : {};
//
// 			$http.get('http://localhost:3000/api/user', {headers: headers}).success(function(data) {
// 				if(data.name) {
// 					$rootScope.authenticated = true;
// 					$scope.user.username = data.name
// 				} else {
// 					$rootScope.authenticated = false;
// 					$scope.user = {};
// 				}
// 				callback && callback();
// 			}).error(function() {
// 				$rootScope.authenticated = false;
// 				callback && callback();
// 			});
// 		};
//
// 		authenticate();
// 		$scope.credentials = {};this
// 		$scope.login = function() {
// 			authenticate($scope.credentials, function() {
// 				if($rootScope.authenticated) {
// 					$scope.error = false;
// 					$scope.showWelcomeToast();
// //						$location.path("/")
//
// 				} else {
// 					$scope.error = true;
// 					$scope.showErrorToast();
// 				}
// 			});
// 		};

		// $scope.logout = function() {
		// 	$http.post('logout', {}).success(function() {
		// 		$rootScope.authenticated = false;
		// 		$location.path("/");
		// 	}).error(function(data) {
		// 		$rootScope.authenticated = false;
		// 	});
		// }
	}
}
