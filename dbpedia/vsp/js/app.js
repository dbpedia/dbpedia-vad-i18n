var dbpv = angular.module('dbpv', ['dbpvServices', 'ngCookies']);

dbpv.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/page/:id', {templateUrl: '/tpl/entity.html', controller: EntityCtrl})
		.when('/resource/:id', {redirectTo: function(params, a, search) {return '/page/'+params.id;} })
		.when('/entity/:id', {redirectTo: function(params, a, search) {return '/page/'+params.id;} })
		.otherwise({redirectTo: '/page/404'});
});



dbpv.filter("predicateFilter", function() {
	return function(input, query) {
		if(!query) return input;
		var result = [];
		angular.forEach(input, function(predicate) {
			if (predicate.label.indexOf(query) != -1) result.push(predicate);
		});
		return result;
	};
});

dbpv.filter("predicateValueFilter", function() { //XXX maybe merge with previous filter
	return function(input, query) {
		if (!query) return input;
		var result = [];
		angular.forEach(input, function(predicate) {
			var hasvalues = false;
			for (var i = 0; i<predicate.values.length; i++) {	//simulates value filter
				if (predicate.values[i].label.indexOf(query.label) != -1) {
					hasvalues = true;
				}	
			}
			if (hasvalues) {
				result.push(predicate);
			}
		});
		return result;
	}
});

dbpv.filter("prettyFilterLang", function() {
	return function(input, lang) {
		if (!lang){
			lang = dbpv_fallback_lang;
		}
		var dbpvp_pretty_map = {
				"http://www.w3.org/2000/01/rdf-schema#label":
					{"property": "label", "show_prop": false, "type": "text", "cls": "dbpvp-label"},
				"http://www.w3.org/2000/01/rdf-schema#comment": 
					{"property": "Description", "show_prop": false, "type": "text", "cls": "dbpvp-descr"},
				"http://dbpedia.org/ontology/birthPlace": 
					{"property":"Place of Birth", "show_prop":true, "type": "text", "cls": "dbpvp-fact"},
				"http://dbpedia.org/ontology/birthDate": 
					{"property":"Date of Birth", "show_prop":true, "type": "text", "cls": "dbpvp-fact"},
				"http://xmlns.com/foaf/0.1/primaryTopic": 
					{"property": "wikipage", "show_prop":false, "type": "uri", "cls": "dbpvp-link"},
				"http://dbpedia.org/ontology/thumbnail": 
					{"property":"image", "show_prop":false, "type": "img", "cls": "dbpvp-img"},
				"http://xmlns.com/foaf/0.1/name": 
					{"property": "name", "show_prop":true, "type": "text", "cls": "dbpvp-fact"}
		};
		var result = [];
		angular.forEach(input, function(predicate) {
			var pretty = dbpvp_pretty_map[predicate.url];
			if (pretty != undefined) {
				var values = [];
				for (var i = 0; i<predicate.values.length; i++) {
					var value = predicate.values[i];
					if (value['xml:lang'] === undefined) {
						values.push(value);
					}else{
						if (value['xml:lang'] == lang) {
							values = [value];
							break;
						}else if (value['xml:lang'] == dbpv_fallback_lang) {
							values = [value];
						}
					}
				}
				pretty.values = values;
				result.push(pretty);
			}
		});
		return result;
	}
});

dbpv.filter("languageFilter", function() {
	return function(input, query) {
		if(!query || input.length<2) return input;
		var result = [];
		var breek = false;
		angular.forEach(input, function(predval) {
			if (!breek){
				if (predval['xml:lang'] === undefined) {
					result.push(predval);
				}else{
					if (predval['xml:lang'] == query) {
						result = [predval];
						breek = true;
					}else if (result.length == 0 && predval['xml:lang'] == dbpv_fallback_lang) {
						result = [predval];
					}
				}
			}
		});
		return result;
	};
});

dbpv.filter("prettyLanguageFilter", function() {
	return function(input, query) {
		if(!query) return input;
		var result = [];
		var breek = false;
		angular.forEach(input, function(predval) {
			if (!breek){
				if (predval['xml:lang'] === undefined) {
					result.push(predval);
				}else{
					if (predval['xml:lang'] == query) {
						result.push(predval);
					}else if (predval['xml:lang'] == dbpv_fallback_lang) {
						result.push(predval);
					}
				}
			}
		});
		return result;
	};
});


