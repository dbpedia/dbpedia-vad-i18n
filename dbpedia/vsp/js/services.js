angular.module('dbpvServices', [])
	.factory('Entity', ['$http', function($http) {
		return {
			triples: function(eid) {
				var localns = "http://dbpedia.org/resource/";
				var entityUrl = localns+eid;
				var trips = [];
				var preloaded = [];
				try{
					preloaded = $("#content");
				}catch(err){
//alert(err.message);
				}
				var about = $("[about]").attr("about");
				if (preloaded.length === 1 && about !== undefined) {
//alert("found something!!!");
					try{
						var rdf = preloaded.rdf();
						var baseURI = rdf.databank.baseURI;
						var nslocal = "http://localhost:8890/resource/"; //XXX
						var tripledump = rdf.databank.dump();
						//alert(JSON.stringify(tripledump));
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
									var property = {'type':'uri', 'url':prop};
									var object = {};
									for (var objkey in propval) {
										object[objkey] = propval[objkey];
									}
									if (object.hasOwnProperty("type") && object.type=="uri") {
										object.url = object.value;
										
										if (object.url == baseURI) {
											object.url = about;
										} else if (object.url.slice(0, nslocal.length) == nslocal) {
											object.url = localns+object.url.slice(nslocal.length, object.url.length);
										}
									}
									trip.subject = subject;
									trip.property = property;
									trip.object = object;
									trips.push(trip);
								}
							}
						}
						//TODO parse RDFQuery results
						//trips = jQuery.parseJSON(preloaded.text());
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
					var query = "SELECT ?hasprop ?v ?isprop where {{<"+entityUrl+"> ?hasprop ?v}UNION{?v ?isprop <"+entityUrl+">}} LIMIT 10000";
					query = encodeURIComponent(query);
				//alert(query);
					var endpoint = "http://live.dbpedia.org/sparql";
					$http.post(endpoint, "query="+query).success(function(data, status, headers, config) {
						var bindings = data['results']['bindings'];
						for (var i = 0; i<bindings.length; i++) {
							var trip = new Object();
							var oneject = {'type':'uri', 'url':entityUrl};
							var twoject = new Object();
							var tripleline = bindings[i];
							var val = tripleline['v'];
							for (var key in val) {
								twoject[key] = val[key];
							}
							if (twoject.hasOwnProperty("type") && twoject.type=="uri") {
								twoject.url = twoject.value;
							}
							var property = {"type":"uri"};
							if ('hasprop' in tripleline) {
								property.url = tripleline["hasprop"]["value"];
								trips.push({'subject':oneject, 'property':property, 'object': twoject});
							}else if ('isprop' in tripleline) {
								property.url = tripleline["isprop"]["value"];
								trips.push({'subject':twoject, 'property':property, 'object': oneject});
							}else{
								alert("Error!");
							}
						}
						dbpv_preprocess_triples(trips);
					}).
					error(function (data, status, headers, config) {
						alert("Error");
					});
					$http.defaults.headers.post['Content-Type'] = prevdef;
				}
				return trips;
			}
		};
	}]);
