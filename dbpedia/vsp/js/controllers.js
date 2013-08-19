function MetaCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview, dir, fwd) {
	$scope.showMore = function(id) {
		var predicate = $scope.revpredicates[id];
		var destination = $scope.predicates[id];
		var transfer = [];
		if (destination !== undefined && destination.complete == false && predicate!== undefined && predicate.values.length > 0) { // then show more
			var amount = 2000;
			amount = Math.min(amount, predicate.values.length);
			for (var i = 0; i<amount ; i++) {
				transfer.push(predicate.values[0]);
				predicate.values.splice(0, 1);
			}
			destination.values = destination.values.concat(transfer);
			if (predicate.values.length == 0) {
				destination.complete = true;
			}
		}
	};

	$scope.previewSemaphore = {};
	$scope.previewSemaphore.count = 0;

	$scope.entityPreview = function(rurl, top, left) {
		var entityPre = "/resource";
		var ontologyPre = "/ontology";
		var propertyPre = "/property";
		if (rurl[0]=='/') { //local XXX
			$scope.preview = {};
			$scope.preview.top = top;
			$scope.preview.left = left;
			$scope.preview.show = true;
			if (rurl.substring(0, entityPre.length) == entityPre) {
				$scope.preview.type = "entity";
				$scope.preview.label = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#label", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.thumbnail = Preview.getProperty(rurl, "http://dbpedia.org/ontology/thumbnail", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.description = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#comment", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
			}else if (rurl.substring(0, ontologyPre.length) == ontologyPre || rurl.substring(0, propertyPre.length) == propertyPre) {
				$scope.preview.type = "property";
				$scope.preview.description = [];
				$scope.preview.label = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#label", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.range = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#range", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.domain = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#domain", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
			}
		}
	};

	$scope.previewItemHover = function() {
		$scope.preview.itemhover = true;
		$scope.preview.previewhover = false;
	};

	$scope.previewItemUnhover = function() {
		$scope.preview.itemhover = false;
		$scope.previewDisabled();
	};

	$scope.previewHover = function() {
		$scope.preview.previewhover = true;
	};

	$scope.previewUnhover = function() {
		$scope.preview.previewhover = false;
		$scope.previewDisabled();
	};

	$scope.previewDisabled = function() {
		$timeout(function() {
			if ($scope.preview.previewhover == false && $scope.preview.itemhover == false) {	
				$scope.preview = {};
			}
		},200);
	};

	$scope.taf_actions = dbpv_taf_actions;

	$scope.sortPredicates = function(item) {
		return item.predid;
	};

	$scope.predicates = {};
	$scope.revpredicates = {};
	$scope.entitySemaphore = 0;

	id = $routeParams.id;

	/* FIXME: quick fix because angular doesn't support slashes in route parameters */
	if ($routeParams.klas !== undefined) {
		id = $routeParams.klas+"/"+id;
	}

	Entity.triples(id, $scope, dir, fwd);
	$scope.dbpvp = {};

	// object-oriented extraction for pretty box (XXX)
	$scope.$watch('predicates', function(predicates) {
		if (predicates !== undefined) {
			for (var id in predicates) {
				if (id!==undefined) {
					dbpvp_process_predicate($scope.dbpvp, predicates[id]);
				}
			}
		}
	},true);
}

function EntityCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview) {
	MetaCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview, "resource", false);	
}

function OwlCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview) {
	MetaCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview, "ontology", true);
}

function PropCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview) {
	MetaCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview, "ontology", true);
}

function ClassCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview) {
	MetaCtrl($scope, $routeParams, $filter, $timeout, Entity, Preview, "ontology", true);
}

function LookupCtrl($scope, $http, $timeout, $cookies) {
	//COOKIES
	$cookies.dbpv_has_js = "1";
	if ($cookies.dbpv_primary_lang === undefined) {
		$cookies.dbpv_primary_lang = $scope.primary_lang;
	}
	$scope.primary_language = $cookies.dbpv_primary_lang;

	//END COOKIES

	var timer = false;
	var delay = 500;
	
	$scope.$watch('primary_language', function(lang) {
		$scope.$parent.$root.primary_lang = lang;
	});

	$scope.$watch('term', function(term) {
		if ($scope.term === undefined || $scope.term == "") {
			$scope.results = [];
		}else{
			if (timer) {
				$timeout.cancel(timer);
			}
			timer = $timeout(function() {
				// DO LOOK UP
				$scope.dolookup();
			}, delay);
		}
	});

	$scope.dolookup = function () {
		if ($scope.term === undefined || $scope.term == "") {
			$scope.results = [];
		}else{
			delete $http.defaults.headers.common['X-Requested-With'];
			$http.get("http://lookup.dbpedia.org/api/search/PrefixSearch?MaxHits=5&QueryString="+$scope.term).success(function(data) {
				var results = data["results"];
				var res = [];
				for (var i = 0; i<results.length ; i++) {
					var result = results[i];
					var r = {"type": "uri", "l_label": result['label'], "url": result['uri']};
					dbpv_preprocess_triple_value(r);
					res.push(r);
				}
				$scope.results = res;
			});
		}
	}

	$scope.clearResults = function() {
		$scope.results = [];
	};
}
