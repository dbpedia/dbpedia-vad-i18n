var dbpv = angular.module('dbpv', ['dbpvServices', 'ngCookies']);

dbpv.run(function($rootScope) {
	$rootScope.localgraph = "http://dbpedia.org";
	$rootScope.dataspace = "localhost";
	$rootScope.primary_lang = "en";
	$rootScope.fallback_lang = "en";
	$rootScope.endpoint = "/sparql";
	$rootScope.languages = [	{"label":"English", "code": "en"}, 
			{"label":"German", "code": "de"},
			{"label":"French", "code": "fr"},
			{"label":"Dutch", "code": "nl"},
			];
});
