dbpv.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/page/:id', {templateUrl: '/tpl/entity.html', controller: EntityCtrl})
		.when('/resource/:id', {redirectTo: function(params, a, search) {return '/page/'+params.id;} })
		.when('/entity/:id', {redirectTo: function(params, a, search) {return '/page/'+params.id;} })
		.when('/ontology/:id', {templateUrl: '/tpl/entity.html', controller: OwlCtrl})
		.when('/property/:id', {templateUrl: '/tpl/entity.html', controller: PropCtrl})
		.when('/class/:id', {templateUrl: '/tpl/entity.html', controller: ClassCtrl})

		.when('/ontology/:klas/:id', {templateUrl: '/tpl/entity.html', controller: OwlCtrl}) //FIXME Quick fix because Angular doesn't support slashes in routing parameters
		.when('/property/:klas/:id', {templateUrl: '/tpl/entity.html', controller: PropCtrl}) //FIXME Quick fix because Angular doesn't support slashes in routing parameters

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
	return function(input, primary, fallback) {
		if(!primary || !fallback || input.length<2) return input;
		var result = [];
		var breek = false;
		angular.forEach(input, function(predval) {
			if (!breek){
				if (predval['xml:lang'] === undefined) {
					result.push(predval);
				}else{
					if (predval['xml:lang'] == primary) {
						result = [predval];
						breek = true;
					}else if (result.length == 0 && predval['xml:lang'] == fallback) {
						result = [predval];
					}
				}
			}
		});
		return result;
	};
});

dbpv.filter("actionFilter", function() {
	return function(actions, about, pred, val) {
		if(!pred || !val) return [];
		var result = [];
		angular.forEach(actions, function(action) {
			if (action.autobind !== undefined && action.autobind(about, pred, val)) {
				result.push(action);
			}
		});
		return result;
	};
});

dbpv.directive('compile', function($compile) {
	return function(scope, element, attrs) {
		scope.$watch(
			function(scope) {
				return scope.$eval(attrs.compile);
			},
			function(value) {
				element.html(value);
				$compile(element.contents())(scope);
			}
		);
	};
});

dbpv.directive('dbpvPreview', function($timeout) {
	return function(scope, element, attrs) {
		//alert(JSON.stringify(attrs));
		var to = undefined;
		element.bind('mouseenter', function () {
			to = $timeout(function() {
				var parent = element;
				var position = parent.offset();
				position.top = position.top + parent.height();
				to = undefined;
				var url = attrs.dbpvPreview;
				scope.entityPreview(url, position.top, position.left);
				scope.previewItemHover();
			}, 800);
		});
		element.bind('mouseleave', function () {
			if(to) $timeout.cancel(to);
			scope.previewItemUnhover();
		});
	};
});

dbpv.directive('labelList', function(Preview, $filter) {
	return {
		link: function(scope, element, attrs) {
			scope.labellist = Preview.getProperty(attrs.labelList, "http://www.w3.org/2000/01/rdf-schema#label", {"count":0}, scope.localgraph, scope.endpoint);

			scope.updateLabellist = function (list) {
				element.text($filter("languageFilter")(list, scope.primary_lang, scope.fallback_lang)[0].label);
			};

			scope.$watch("labellist", function (list) {
				scope.updateLabellist(list);
			}, true);
			scope.$watch("primary_lang", function (list) {
				scope.updateLabellist(scope.labellist);
			});
		}
	};
});
