var dbpv = angular.module('dbpv', ['dbpvServices']);

dbpv.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/page/:id', {templateUrl: '/tpl/entity.html', controller: EntityCtrl})
		.when('/resource/:id', {redirectTo: function(params, a, search) {return '/page/'+params.id;} })
		.when('/entity/:id', {redirectTo: function(params, a, search) {return '/page/'+params.id;} })
		.when('/ontology/:id', {templateUrl: '/tpl/entity.html', controller: OwlCtrl})
		.when('/property/:id', {templateUrl: '/tpl/entity.html', controller: PropCtrl})
		.when('/class/:id', {templateUrl: '/tpl/entity.html', controller: ClassCtrl})
		.otherwise({redirectTo: '/entity/404'});
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

