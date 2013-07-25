var dbpv = angular.module('dbpv', ['dbpvServices']);
/*dbpv.config(function($locationProvider, $routeProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider.
			when('/', {templateUrl: 'tpl/list.html', controller: ListCtrl}).
			when('/entity/:id', {templateUrl: 'tpl/entity.html', controller: EntityCtrl}).
			when('/search/:id', {templateUrl: 'tpl/search.html', controller: SearchCtrl}).
			otherwise({redirectTo: '/'});
	});

*/
dbpv.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/page/:id', {templateUrl: '/tpl/entity.html', controller: EntityCtrl})
		.when('/entity/:id', {templateUrl: '/tpl/entity.html', controller: EntityCtrl})
		.otherwise({redirectTo: '/page/404'});
});
