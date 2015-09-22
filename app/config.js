export function routing($routeProvider, $locationProvider) {
  console.log('configuring app routing');
  $routeProvider
	.when('/login', {
		templateUrl: './app/partials/login.html',
	})
	.when('/events', {
		templateUrl: './app/partials/events.html',
		controller: 'EventController'
	})
	.when('/events/:id', {
		templateUrl: './app/partials/event.html',
		controller: 'EventController'
	})
	.when('/ongs/:id', {
		templateUrl: './app/partials/ong.html',
		controller: 'OngController'
	})
	.when('/new/ong', {
		templateUrl: './app/partials/ong-new.html',
		controller: 'OngController'
	})
	.when('/volunteers/:id', {
		templateUrl: './app/partials/volunteer.html',
		controller: 'VolunteerController'
	})
	.otherwise({
		redirectTo: 'events'
	});
}

export function theming($mdThemingProvider) {
  console.log('configuring app theming');
  $mdThemingProvider.theme('appTheme')
		.primaryPalette('blue')
		.accentPalette('pink');

	$mdThemingProvider.theme('blueGreyTheme')
		.primaryPalette('blue-grey')
		.accentPalette('blue');

	$mdThemingProvider.theme('tealTheme')
		.primaryPalette('teal')
		.accentPalette('indigo');

	$mdThemingProvider.theme('indigoTheme')
		.primaryPalette('indigo')
		.accentPalette('pink');

	$mdThemingProvider.theme('cyanTheme')
		.primaryPalette('cyan')
		.accentPalette('amber');

	$mdThemingProvider.theme('pinkTheme')
		.primaryPalette('pink')
		.accentPalette('purple');

	$mdThemingProvider.theme('purpleTheme')
		.primaryPalette('purple')
		.accentPalette('deep-orange');

	$mdThemingProvider.theme('deepOrangeTheme')
		.primaryPalette('deep-orange')
		.accentPalette('orange');

	$mdThemingProvider.theme('deepPurpleTheme')
		.primaryPalette('deep-purple')
		.accentPalette('orange');

	$mdThemingProvider.theme('amberTheme')
		.primaryPalette('amber')
		.accentPalette('teal');

	$mdThemingProvider.theme('greenTheme')
		.primaryPalette('green')
		.accentPalette('amber');

	$mdThemingProvider.theme('errorTheme')
		.primaryPalette('red');

	$mdThemingProvider.setDefaultTheme('appTheme');
}
