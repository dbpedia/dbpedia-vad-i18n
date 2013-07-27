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
		.when('/resource/:id', {redirectTo: function(params, path, seach) {return '/page/'+params.id;} })
		.otherwise({redirectTo: '/page/404'});
});

function dbpv_preprocess_triples(triples) {
	var prefixes = {
		"http://dbpedia.org/resource/": "dbpedia",
		"http://www.w3.org/1999/02/22-rdf-syntax-ns#": "rdf",
		"http://xmlns.com/foaf/0.1/": "foaf",
		"http://dbpedia.org/ontology/": "dbpedia-owl",
		"http://dbpedia.org/property/": "dbpprop",
		"http://www.w3.org/2000/01/rdf-schema#": "rdfs"
	};
	var graph = "http://dbpedia.org";
	var space = "http://localhost:8890";

	for (var i = 0; i<triples.length; i++) {
		var triple = triples[i];
		for (var key in triple) {
			var sing = triple[key];
			if (sing.type=="uri") {
				for (var start in prefixes) {
					if (sing.url.slice(0, start.length) == start) {
						sing.prefix = prefixes[start];
						sing.short = sing.url.slice(start.length, sing.url.length);
					}
				}
				if (sing.url.slice(0, graph.length) == graph) {
					sing.uri = sing.url;
					sing.url = sing.url.slice(graph.length, sing.url.length);
				}
				if (sing.prefix!==undefined && sing.short !== undefined) {
					sing.label = sing.prefix + ":" + sing.short;
				}else{
					sing.label = sing.url;
				}

			}else{
				sing.label = sing.value;
			}
		}
	}
}
