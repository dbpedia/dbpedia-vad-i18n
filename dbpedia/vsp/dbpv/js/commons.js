var dbpv_prefixes = {
		"http://dbpedia.org/resource/": "dbpedia",
		"http://www.w3.org/1999/02/22-rdf-syntax-ns#": "rdf",
		"http://www.w3.org/2000/01/rdf-schema#": "rdfs",
		"http://xmlns.com/foaf/0.1/": "foaf",
		"http://dbpedia.org/ontology/": "dbpedia-owl",
		"http://dbpedia.org/property/": "dbpprop",
		"http://dbpedia.org/resource/Category:": "category",
		"http://dbpedia.org/class/yago/": "yago",
		"http://www.w3.org/2001/XMLSchema#": "xsd"
	};

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

function dbpv_preprocess_triples(triples, localgraph) {
	for (var i = 0; i<triples.length; i++) {
		var triple = triples[i];
		dbpv_preprocess_triple(triple, localgraph);
	}
}

function dbpv_preprocess_triple(triple, localgraph) {
	for (var key in triple) {
		var sing = triple[key];
		dbpv_preprocess_triple_value(sing, localgraph);
	}
}

function dbpv_preprocess_triple_value(sing, localgraph) {
	if (typeof(localgraph) == "undefined") localgraph = get_localgraph();
	if (sing.type=="uri") {
		if (sing.url === undefined) {
			sing.url = sing.value;
		}
		sing.uri = sing.url
		for (var start in dbpv_prefixes) {
			if (sing.url.slice(0, start.length) == start) {
				sing.prefix = dbpv_prefixes[start];
				sing.short = sing.url.slice(start.length, sing.url.length);
			}
		}
		if (sing.url.slice(0, localgraph.length) == localgraph) {
			sing.url = sing.url.slice(localgraph.length, sing.url.length);
			sing.url = addLocalPrefix(sing.url);
			sing.url.local = true;
		}
		if (sing.prefix!==undefined && sing.short !== undefined) {
			sing.label = sing.prefix + ":" + sing.short;
		}else{
			sing.label = sing.uri;
		}

	}else{
		sing.label = sing.value;
		if (sing.type == "literal") {
			sing.typelabel = "@" + sing["xml:lang"];
		}else if (sing.type == "typed-literal" && sing.datatype !== undefined) {
			var datatype = "";
			for (var start in dbpv_prefixes) {
				if (sing.datatype.slice(0, start.length) == start) {
					datatype = dbpv_prefixes[start] + ":" + sing.datatype.slice(start.length, sing.datatype.length);
				}
			}
			if (datatype.length > 0) {
				sing.typelabel = "(" + datatype + ")";
			}
		}
	}
}

function dbpv_preprocess_triple_url(url, localgraph) {
	if (typeof(localgraph) == "undefined") localgraph = get_localgraph();
	if (url.slice(0, localgraph.length) == localgraph) {
		url = url.slice(localgraph.length, url.length);
		url = addLocalPrefix(url);
		url.local = true;
	}
	return url;
}

function addLocalPrefix(url) {
	return get_localprefix() + url;
}

function removeLocalPrefix(url) {
	var prefix = get_localprefix();
	if (url.slice(0, prefix.length) == prefix) {
		return url.slice(prefix.Length, url.length);
	}
}

function get_localgraph(){
	var ret = angular.element($('body')).scope().localgraph;
	return ret;
	
function get_localprefix() {
	var ret = angular.element($('body')).scope().localprefix;
	return ret;
}
}
