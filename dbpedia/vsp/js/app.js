var dbpv = angular.module('dbpv', ['dbpvServices']);

dbpv.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/page/:id', {templateUrl: '/tpl/entity.html', controller: EntityCtrl})
		.when('/resource/:id', {redirectTo: function(params, path, seach) {return '/page/'+params.id;} })
		.otherwise({redirectTo: '/page/404'});
});

