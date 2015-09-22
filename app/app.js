'use strict';
import angular from 'angular';
import 'angular-route';
import 'angular-material';
import 'angular-resource';
import {routing, theming} from './config'
import main from './controllers/main.controller'
import login from './controllers/login.controller'
import event from './controllers/event.controller'
import ong from './controllers/ong.controller'
import volunteer from './controllers/volunteer.controller'
import AuthInterceptor from './factories/AuthInterceptor'
import AuthTokenFactory from './factories/AuthTokenFactory'
import UserFactory from './factories/UserFactory'

var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate', 'ngMaterial'])
  .config(['$httpProvider', '$routeProvider', '$locationProvider', '$mdThemingProvider',
  function($httpProvider, $routeProvider, $locationProvider, $mdThemingProvider) {
    // $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    // $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + '';
    $httpProvider.interceptors.push(AuthInterceptor);
    routing($routeProvider, $locationProvider);
    theming($mdThemingProvider);
  }])
  .constant('API_URL', 'http://localhost:3000/api/')
  .controller('MainController', main)
  .controller('LoginController', login)
  .controller('EventController', event)
  .controller('OngController', ong)
  .controller('VolunteerController', volunteer)
  .factory('AuthInterceptor', AuthInterceptor)
  .factory('AuthTokenFactory', AuthTokenFactory)
  .factory('UserFactory', ['API_URL', '$http', '$q', 'AuthTokenFactory', UserFactory]);

app.directive('appSidenav', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/partials/sidenav.html'
	};
}).directive('appHeader', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/partials/app-header.html',
		controller: 'LoginController',
    controllerAs: 'login'
	};
}).directive('volEvents', function() {
	return {
		restrict: 'E',
		scope: { events: '=events' },
		templateUrl: 'app/partials/events-list.html'
	};
}).directive('volEventsMini', function() {
	return {
		restrict: 'E',
		scope: { events: '=events' },
		templateUrl: 'app/partials/events-list-mini.html'
	};
}).directive('volOngsList', function() {
	return {
		restrict: 'E',
		scope: { ongs: '=ongs' },
		templateUrl: 'app/partials/ongs-list.html'
	};
}).directive('appFooter', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/partials/footer.html'
	};
});
