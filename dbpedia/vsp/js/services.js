angular.module('dbpvServices', [])
	.factory('Entity', ['$http', function($http) {
		return {
			triples: function(eid) {
				var entityUrl = "http://dbpedia.org/resource/"+eid;
				var trips = [];
				var preloaded = [];
				try{
					preloaded = $("#content");
				}catch(err){
//alert(err.message);
				}
				if (false) { //preloaded.length === 1) {
//alert("found something!!!");
					try{
						var tripledump = preloaded.rdf().databank.dump();
						alert(JSON.stringify(tripledump));
						//TODO parse RDFQuery results
						trips = jQuery.parseJSON(preloaded.text());
						preloaded.remove();
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
							var propline = bindings[i];
							var val = propline['v']['value'];
							var trip = undefined;
							if ('hasprop' in propline) {
								var prop = propline["hasprop"]["value"];
								trip = {'subject':entityUrl, 'property':prop, 'object': val, 'subjectType': 'url', 'objectType': propline["hasprop"]["type"], 'subjectTitle':entityUrl, 'objectTitle':val};
							}else if ('isprop' in propline) {
								var prop = propline["isprop"]["value"];
								trip = {'subject':val, 'property':prop, 'object': entityUrl, 'objectType': 'url', 'subjectType': propline["isprop"]["type"], 'objectTitle':entityUrl, 'subjectTitle':val};
							}else{
								alert("Error!");
							}
							if (trip!==undefined) {
								// generate labels for subjects, props and objects
								var prefix_dbpedia = "http://dbpedia.org/resource/";
								if (trip["subject"].slice(0, prefix_dbpedia.length) == prefix_dbpedia){
									trip["subjectTitle"] = "dbpedia:"+trip["subject"].slice(prefix_dbpedia.length, trip["subject"].length);
									trip["subject"] = "/page/"+trip["subject"].slice(prefix_dbpedia.length, trip["subject"].length);
								}
								if (trip["object"].slice(0, prefix_dbpedia.length) == prefix_dbpedia){
									trip["objectTitle"] = "dbpedia:"+trip["object"].slice(prefix_dbpedia.length, trip["object"].length);
									trip["object"] = "/page/"+trip["object"].slice(prefix_dbpedia.length, trip["object"].length);
								}

								trips.push(trip);
							}
						}
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
