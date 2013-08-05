angular.module('dbpvServices', [])
	.factory('Entity', ['$http', function($http) {
		return {
			triples: function(id, scope, dir) {
				if (typeof(dir) === 'undefined') dir = 'resource';
				var graph = "http://dbpedia.org"; //XXX
				var space = location.protocol+"//"+location.host; //XXX
				var entityUrl = graph+"/"+dir+"/"+id;
				var trips = [];
				var preloaded = $("#content");
				var about = $("[about]").attr("about");
				if (false && dir == "resource" && preloaded.length === 1 && about !== undefined) {
					try{
						var rdf = preloaded.rdf();
						var baseURI = rdf.databank.baseURI;
						var tripledump = rdf.databank.dump();
						for (var subj in tripledump) {
							var properties = tripledump[subj];
							if (subj == baseURI) {
								subj = about;
							}
							for (var prop in properties) {
								var propertyvalues = properties[prop];
								for (var i = 0; i<propertyvalues.length; i++) {
									var trip = new Object();
									var propval = propertyvalues[i];
									var subject = {'type':'uri', 'url':subj};
									if (subject.url.slice(0, space.length) == space) {
											subject.url = graph+subject.url.slice(space.length, subject.url.length);
										}
									var property = {'type':'uri', 'url':prop, 'value':prop};
									var object = {};
									for (var objkey in propval) {
										object[objkey] = propval[objkey];
									}
									if (object.hasOwnProperty("type") && object.type=="uri") {
										object.url = object.value;
										
										if (object.url == baseURI) {
											object.url = about;
										} else if (object.url.slice(0, space.length) == space) {
											object.url = graph+object.url.slice(space.length, object.url.length);
										}
									}
									trip.subject = subject;
									trip.property = property;
									trip.object = object;
									if (trip.subject.url == about) {
										trip.query = "a";
									}else{
										trip.query = "b";
									}
									trips.push(trip);
								}
							}
						}
						preloaded.remove();
	// TODO XXX FIXME transform scraped triples into predicate-value format for normal display
						dbpv_preprocess_triples(trips);
						scope.triples = trips;
					}catch(err){
alert("malformed JSON");
					}
				}else{
					var preloaded = $("#static");
					if (preloaded.length === 1) {
						preloaded.remove();
					}
					//$http.defaults.useXDomain = true;
					delete $http.defaults.headers.common['X-Requested-With'];
					var prevdef = $http.defaults.headers.post['Content-Type'];
					$http.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
					var inquery = encodeURIComponent("SELECT ?hasprop ?v where {<" + entityUrl + "> ?hasprop ?v}");
					var outquery = encodeURIComponent("SELECT ?v ?isprop where { ?v ?isprop <" + entityUrl + ">} LIMIT 1000");
					var endpoint = "http://dbpedia.org/sparql";
					endpoint = "/sparql";

					// START XXX NEW
					$http.post(endpoint, "query="+inquery).success(function(data, status, headers, config) {
						var predicates = {};
						var bindings = data["results"]["bindings"];
						try{
						for (var i = 0; i<bindings.length; i++) {	
							var trip = new Object();

							var object = new Object();
							var tripleline = bindings[i];
							var val = tripleline['v'];
							for (var key in val) {
								object[key] = val[key];
							}
							if (object.hasOwnProperty("type") && object.type=="uri") {
								object.url = object.value;
							}
							var property = {"type":"uri", "url": tripleline["hasprop"]["value"], "reverse":false, "complete":true};
							dbpv_preprocess_triple_value(property);
							dbpv_preprocess_triple_value(object);

							predid  = "i-"+property.url;
							predicate = predicates[predid];
							if (predicate === undefined) { // add it
								predicates[predid] = property;
								predicate = property;
								predicate.predid = predid;
								predicate.values = [];
							}
							predicate.values.push(object);
						}
						}catch(err){alert("error in loop");}
						scope.predicates = jQuery.extend({}, scope.predicates, predicates);
					}).
					error(function (data, status, headers, config) {
						alert("Inquery loading error");
					});
					// MEDIAS RES XXX NEW
					$http.post(endpoint, "query="+outquery).success(function(data, status, headers, config) {
						predicates = {};
						var bindings = data["results"]["bindings"];
						try{
						for (var i = 0; i<bindings.length; i++) {	
							var trip = new Object();
							var subject = new Object();
							var tripleline = bindings[i];
							var val = tripleline['v'];
							for (var key in val) {
								subject[key] = val[key];
							}
							if (subject.hasOwnProperty("type") && subject.type=="uri") {
								subject.url = subject.value;
							}
							var property = {"type":"uri", "url": tripleline["isprop"]["value"], "reverse":true};
							dbpv_preprocess_triple_value(property);
							dbpv_preprocess_triple_value(subject);

							predid = "o-"+property.url;
							predicate = predicates[predid];
							if (predicate === undefined) { // add it
								predicates[predid] = property;
								predicate = property;
								predicate.predid = predid;
								predicate.values = [];
							}
							predicate.values.push(subject);
						}
						}catch(err){alert("error in loop");}
						scope.revpredicates = jQuery.extend({}, scope.revpredicates, predicates);
						for (var revpred in scope.revpredicates) {
							var totransfer = scope.revpredicates[revpred];
							var transfer = {};
							for (var predkey in totransfer) {
								if (predkey != "values" && predkey != "$$hashKey") {
									transfer[predkey] = totransfer[predkey];
								}
							}
							var init_amount = 5;
							init_amount = Math.min(init_amount, totransfer["values"].length);
							transfer.values = [];
							for (var i = 0; i< init_amount; i++) {
								transfer["values"].push(totransfer["values"][0]);
								totransfer["values"].splice(0, 1);
							}
							if (totransfer["values"].length == 0) {
								transfer["complete"] = true;
							}else{
								transfer["complete"] = false;
							}
							scope.predicates[revpred] = transfer;
						}
					}).
					error(function (data, status, headers, config) {
						alert("Outquery loading error");
					});
					// END XXX NEW
					$http.defaults.headers.post['Content-Type'] = prevdef;
				}
			}
		};
	}]);
