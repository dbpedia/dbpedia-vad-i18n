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
				$("#dbpvpreview").css("top",top+"px");
			$scope.preview.left = left;
				$("#dbpvpreview").css("left",left+"px");
			$scope.preview.show = true;
			if (rurl.substring(0, entityPre.length) == entityPre) {
				$scope.preview.type = "entity";
				$scope.preview.label = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#label", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.thumbnail = Preview.getProperty(rurl, "http://dbpedia.org/ontology/thumbnail", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.description = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#comment", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
			}else if (rurl.substring(0, ontologyPre.length) == ontologyPre || rurl.substring(0, propertyPre.length) == propertyPre) {
				$scope.preview.type = "ontology";
				$scope.preview.description = [];
				$scope.preview.label = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#label", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.range = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#range", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.domain = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#domain", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
				$scope.preview.superClass = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#subClassOf", $scope.previewSemaphore, $scope.localgraph, $scope.endpoint);
			}
		} else if (rurl.substr(0, $scope.owlgraph.length) == $scope.owlgraph) {
			$scope.preview = {};
			$scope.preview.top = top;
				$("#dbpvpreview").css("top",top+"px"); //IE hack ($.browser.msie check requires jQuery plugin now)
			$scope.preview.left = left;
				$("#dbpvpreview").css("left",left+"px"); //IE hack ($.browser.msie check requires jQuery plugin now)
			$scope.preview.show = true;
			rurl = rurl.substr($scope.owlgraph.length);
			if (rurl.substring(0, ontologyPre.length) == ontologyPre || rurl.substring(0, propertyPre.length) == propertyPre) {
				$scope.preview.type = "ontology";
				$scope.preview.description = [];
				$scope.preview.label = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#label", $scope.previewSemaphore, $scope.owlgraph, $scope.owlendpoint);
				$scope.preview.range = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#range", $scope.previewSemaphore, $scope.owlgraph, $scope.owlendpoint);
				$scope.preview.domain = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#domain", $scope.previewSemaphore, $scope.owlgraph, $scope.owlendpoint);
				$scope.preview.superClass = Preview.getProperty(rurl, "http://www.w3.org/2000/01/rdf-schema#subClassOf", $scope.previewSemaphore, $scope.owlgraph, $scope.owlendpoint);
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
	
	$scope.sortValues = function (item) {
		if (item.prefix !== undefined) {
			return item.prefix+item.short;
		}else{
			return item.label;
		}
	};

	$scope.predicates = {};
	$scope.revpredicates = {};
	$scope.entitySemaphore = 0;

	Entity.triples($routeParams.id, $scope, dir, fwd);
	$scope.dbpvp = {};
	
	$scope.legends = {};

	//$scope.dbpvp.links = {"wikipedia": [{"label":"wikipedia.org/wiki/Lenka", "url":"#"}], "dbpedia": [{"label":"nl.dbpedia.org/page/Lenka", "url":"#"}, {"label":"es.dbpedia.org/page/Lenka", "url":"#"}]};

	$scope.searchScope = angular.element(document.getElementById('searchbar')).scope();
	$scope.searchScope.availableLanguages = {}; //Clear available languages

	$scope.$watch('predicates', function(predicates) {
		if (predicates !== undefined) {
			// Pretty Box
			for (var id in predicates) {
				if (id!==undefined) {
					dbpvp_process_predicate($scope.dbpvp, predicates[id]);
				}
				for (var i = 0; i<predicates[id].values.length; i++) {
					var val = predicates[id].values[i];
					if (val["xml:lang"] !== undefined) {
						$scope.searchScope.newAvailableLanguage(val["xml:lang"]);
					}
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

function LookupCtrl($scope, $http, $timeout) {
	//COOKIES
	$.cookie("dbpv_has_js", "1");
	if ($.cookie("dbpv_primary_lang") === undefined) {
		$.cookie("dbpv_primary_lang", $scope.primary_lang);
	}
	$scope.primary_language = $.cookie("dbpv_primary_lang");

	//END COOKIES*/

	var timer = false;
	var delay = 500;

	$scope.results = [];

	$scope.availableLanguages = {};
	$scope.newAvailableLanguage = function (args) {
		$scope.availableLanguages[args] = $scope.languages[args];
	};
	$scope.restLanguages = function() {
		var ret = {};
		for (var code in $scope.languages) {
			if (! (code in $scope.availableLanguages)) {
				ret[code] = $scope.languages[code];
			}
		}
		return ret;
	};

	$scope.$watch('primary_language', function(lang) {
		$scope.$parent.$root.primary_lang = lang;
		$.cookie("dbpv_primary_lang", lang);
		if (! (lang in $scope.availableLanguages)) {
			var more = false;
			for (var k in $scope.availableLanguages) {
				more = true;
				break;
			}
			if (more) $scope.addNotification("There are no values in the chosen language for this entity", 5000);
		}
	});

	$scope.addNotification = function (text, timeout) {
		$scope.$broadcast("show notification", {"text":text, "timeout":timeout});
	};

	$scope.getNativeName = function(code) {
		return $scope.languages[code].nativeName;
	};

	$scope.selectLanguage = function(code) {
		$scope.primary_language = code;
	};

	$scope.$watch('term', function(term) {
		if (term === undefined || term == "") {
			$scope.results = [];
		}else{
			if (term.url !== undefined) {
				if (term.url.substr(0, $scope.lookupgraph.length) == $scope.lookupgraph) {
					term.url = term.url.substr($scope.lookupgraph.length);
				}
				window.location = "/#"+term.url;
				//window.location = term.url;
			}
		}
	});

	$scope.lookup = function() {
		if ($scope.term === undefined || $scope.term == "") {
			$scope.results = [];
		}else{
			delete $http.defaults.headers.common['X-Requested-With'];
			//alert("returning promise");
			return $http.get($scope.lookupendpoint+"/PrefixSearch?MaxHits=5&QueryString="+$scope.term).then(function(data) {
				var results = data.data["results"];
				var res = [];
				for (var i = 0; i<results.length ; i++) {
					var result = results[i];
					var r = {"type": "uri", "l_label": result['label'], "url": result['uri']};
					dbpv_preprocess_triple_value(r);
					res.push(r);
			//		console.log(r.l_label);
				}
				return res;
			});
		}
	};
}

function NotificationCtrl ($scope, $timeout) {
	$scope.notifications = [];

	$scope.$on("show notification", function(event, obj) {
		$scope.addNotification(obj.text, obj.timeout);
	});

	$scope.addNotification = function (text, timeout) {
		var noti = {"text":text};
		if (timeout !== undefined) {
			noti.timeout = $timeout (function () {
				$scope.removeNotification(noti)
			}, timeout);
		}
		$scope.notifications.push(noti);
	};

	$scope.removeNotification = function (noti) {
		for (var i = 0; i<$scope.notifications.length; i++) {
			if (noti == $scope.notifications[i]) {
				$scope.notifications.splice(i,1);
				if (noti.timeout !== undefined) $timeout.cancel(noti.timeout);
			}
		}
	};
}

function ShortcutCtrl ($scope) {
	$scope.shortcuts = [];

	$scope.addShortcut = function (url, label, prio) {
		var neue = {"url":url,"label":label, "prio": prio};
		var prevbigger = false;
		var added = false;
		var duplicate = false;
		for (var i = 0; i<$scope.shortcuts.length; i++) {
			if (url == $scope.shortcuts[i].url) {
				duplicate = true;
				break
			}
		}
		if (!duplicate) {
			for (var i = 0; i<$scope.shortcuts.length; i++) {
				if ($scope.shortcuts[i].prio < neue.prio) {
					$scope.shortcuts.splice(i,0,neue);
					added = true;
					break;
				}
			}
			if ($scope.shortcuts.length == 0 || !added) {
				$scope.shortcuts.push(neue);
			}
		}
	};
/*
	$scope.addShortcut ("qsdfqsd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsdk", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsdd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsgd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqqssd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsdfd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqsdfqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdqsffqsqsdfqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqsdqsdfqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqfqsdsdfqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqsdqsdffqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqsdfqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqsdfhqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqsdfqgdfd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqsdfdfgsqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqqsfqssdfqd", "qsdfqsfd", 1);
	$scope.addShortcut ("qsdfqsqsdfsdfgqd", "qsdfqsfd", 1);*/
}

function FooterCtrl ($scope) {
	$scope.about.datalink = "/data/"+($scope.about.title);
}
