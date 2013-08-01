var dbpv_prefixes = {
		"http://dbpedia.org/resource/": "dbpedia",
		"http://http://www.w3.org/1999/02/22-rdf-syntax-ns#": "rdf",
		"http://xmlns.com/foaf/0.1/": "foaf",
		"http://dbpedia.org/ontology/": "dbpedia-owl"
	};

var dbpv_localns = "http://dbpedia.org/resource/";

function dbpv_pretty_predicate(url, value) {
	var dbpv_pretty_map = {	//TODO make global var out of this
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
	var pretty = dbpv_pretty_map[url];
	if (pretty !== undefined) {
		pretty.value = value;
	}
	return pretty;
}

function dbpv_preprocess_triples(triples) {
	for (var i = 0; i<triples.length; i++) {
		var triple = triples[i];
		dbpv_preprocess_triple(triple);
	}
}

function dbpv_preprocess_triple(triple) {
	for (var key in triple) {
		var sing = triple[key];
		dbpv_preprocess_triple_value(sing);
	}
}

function dbpv_preprocess_triple_value(sing) {
	if (sing.type=="uri") {
		for (var start in dbpv_prefixes) {
			if (sing.url.slice(0, start.length) == start) {
				sing.prefix = dbpv_prefixes[start];
				sing.short = sing.url.slice(start.length, sing.url.length);
			}
		}
		if (sing.url.slice(0, dbpv_localns.length) == dbpv_localns) {
			sing.uri = sing.url;
			sing.url = "/resource/"+sing.url.slice(dbpv_localns.length, sing.url.length);
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
