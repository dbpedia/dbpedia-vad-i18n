var dbpv_prefixes = {
		"http://dbpedia.org/resource/": "dbpedia",
		"http://www.w3.org/1999/02/22-rdf-syntax-ns#": "rdf",
		"http://www.w3.org/2000/01/rdf-schema#": "rdfs",
		"http://xmlns.com/foaf/0.1/": "foaf",
		"http://dbpedia.org/ontology/": "dbpedia-owl",
		"http://dbpedia.org/property/": "dbpprop",
		"http://dbpedia.org/resource/Category:": "category",
		"http://dbpedia.org/class/yago/": "yago"
	};

var dbpv_localgraph = "http://dbpedia.org";

var dbpv_primary_lang = "en";
var dbpv_fallback_lang = "en";

var dbpv_languages = [	{"label":"English", "code": "en"}, 
			{"label":"German", "code": "de"},
			{"label":"French", "code": "fr"},
			{"label":"Dutch", "code": "nl"},
			];

function dbpvp_process_predicate(pretty, predicate) {
	mapping = { 	"http://www.w3.org/2000/01/rdf-schema#label": "label",
			"http://www.w3.org/2000/01/rdf-schema#comment": "description",
			"http://dbpedia.org/ontology/thumbnail": "thumbnail"
		  };
	var property = mapping[predicate.uri];
	var value = undefined;
	if (property !== undefined) {
		pretty[property] = predicate.values;
	}
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
		sing.uri = sing.url
		for (var start in dbpv_prefixes) {
			if (sing.url.slice(0, start.length) == start) {
				sing.prefix = dbpv_prefixes[start];
				sing.short = sing.url.slice(start.length, sing.url.length);
			}
		}
		if (sing.url.slice(0, dbpv_localgraph.length) == dbpv_localgraph) {
			sing.url = sing.url.slice(dbpv_localgraph.length, sing.url.length);
		}
		if (sing.prefix!==undefined && sing.short !== undefined) {
			sing.label = sing.prefix + ":" + sing.short;
		}else{
			sing.label = sing.uri;
		}

	}else{
		sing.label = sing.value;
	}
}
