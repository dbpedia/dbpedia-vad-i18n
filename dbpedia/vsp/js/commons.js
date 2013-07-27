
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
	var space = location.protocol+ "//"+ location.host; 
//TODO move these configs and others to one place at startup and make globally accessible

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


function dbpv_pretty_triple(triple) {
	var map = {					//TODO make global var out of this
		"http://www.w3.org/2000/01/rdf-schema#label":
			{"property": "label", "show_prop": false, "type": "text"},
		"http://www.w3.org/2000/01/rdf-schema#comment": 
			{"property": "Description", "show_prop": true, "type": "text"},
		"http://dbpedia.org/ontology/birthPlace": 
			{"property":"Place of Birth", "show_prop":true, "type": "text"},
		"http://dbpedia.org/ontology/birthDate": 
			{"property":"Date of Birth", "show_prop":true, "type": "text"},
		"http://xmlns.com/foaf/0.1/primaryTopic": 
			{"property": "wikipage", "show_prop":false, "type": "uri"},
		"http://dbpedia.org/ontology/thumbnail": 
			{"property":"image", "show_prop":false, "type": "img"},
		"http://xmlns.com/foaf/0.1/name": 
			{"property": "Name", "show_prop":true, "type": "text"}
	};

	var pretty = map[triple.property.value];
	if ( pretty !== undefined) {
		pretty.value = triple.object.value;
	}
	return pretty;
}
