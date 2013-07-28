angular.module('dbpvServices', [])
	.factory('Entity', ['$http', function($http) {
		return {
			triples: function(id, dir) {
				if (typeof(dir) === 'undefined') dir = 'resource';
				var graph = "http://dbpedia.org"; //XXX
				var space = location.protocol+"//"+location.host; //XXX
				var entityUrl = graph+"/"+dir+"/"+id;
				var trips = [];
				var preloaded = $("#content");
				var about = $("[about]").attr("about");
				if (dir == "resource" && preloaded.length === 1 && about !== undefined) {
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

						dbpv_preprocess_triples(trips);
						//return trips;
					}catch(err){
alert("malformed JSON");
					}
				}else{
					$http.defaults.useXDomain = true;
					delete $http.defaults.headers.common['X-Requested-With'];
					var prevdef = $http.defaults.headers.post['Content-Type'];
					$http.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
					var inquery = encodeURIComponent("SELECT ?hasprop ?v where {<" + entityUrl + "> ?hasprop ?v}");
					var outquery = encodeURIComponent("SELECT ?v ?isprop where { ?v ?isprop <" + entityUrl + ">} LIMIT 2000");
					var endpoint = "http://live.dbpedia.org/sparql";
					// START XXX NEW
					var tripls = [];
					$http.post(endpoint, "query="+inquery).success(function(data, status, headers, config) {
						var bindings = data["results"]["bindings"];
						for (var i = 0; i<bindings.length; i++) {	
							var trip = new Object();
							var subject = {'type':'uri', 'url':entityUrl};
							var object = new Object();
							var tripleline = bindings[i];
							var val = tripleline['v'];
							for (var key in val) {
								object[key] = val[key];
							}
							if (object.hasOwnProperty("type") && object.type=="uri") {
								object.url = object.value;
							}
							var property = {"type":"uri", "url": tripleline["hasprop"]["value"]};
							property.value = property.url;
							tripls.push({'subject':subject, 'property':property, 'object': object, 'query':'a'});
							
						}
						dbpv_preprocess_triples(tripls);
						for (var k = 0; k<tripls.length; k++) {
							trips.push(tripls[k]);
						}
					}).
					error(function (data, status, headers, config) {
						alert("Inquery loading error");
					});
					// MEDIAS RES XXX NEW
					tripls = [];
					$http.post(endpoint, "query="+outquery).success(function(data, status, headers, config) {
						var bindings = data["results"]["bindings"];
						for (var i = 0; i<bindings.length; i++) {	
							var trip = new Object();
							var object = {'type':'uri', 'url':entityUrl};
							var subject = new Object();
							var tripleline = bindings[i];
							var val = tripleline['v'];
							for (var key in val) {
								subject[key] = val[key];
							}
							if (subject.hasOwnProperty("type") && subject.type=="uri") {
								subject.url = subject.value;
							}
							var property = {"type":"uri", "url": tripleline["isprop"]["value"]};
							property.value = property.url;
							tripls.push({'subject':subject, 'property':property, 'object': object, 'query':'b'});
							
						}
						dbpv_preprocess_triples(tripls);
						//trips.concat(tripls);
						for (var k = 0; k<tripls.length; k++) {
							trips.push(tripls[k]);
						}
					}).
					error(function (data, status, headers, config) {
						alert("Outquery loading error");
					});
					// END XXX NEW
					$http.defaults.headers.post['Content-Type'] = prevdef;
				}
				return trips;
			}
		};
	}]);
