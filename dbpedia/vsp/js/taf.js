var dbpv_taf_actions = [];

function tafAdd(action) {
	dbpv_taf_actions.push(action);
}

function TafAction() {
	dbpv_taf_actions.push(this);
}

TafAction.prototype.autobind = function (about, predicate, value) {
	if (value.taf !== undefined) {
		if (value.taf[this.id] === undefined) {
			value.taf[this.id] = {"init":false};
		}
		if (!value.taf[this.id].init) {
			this.initialize(about, predicate, value);
			value.taf[this.id].init = true;
		}else{
			return this.check(about, predicate, value);
		}
	}else{
		return false;
	}
};

TafAction.prototype.initialize = function (about, predicate, value) {
//	alert("initializing");
};

TafAction.prototype.check = function (about, predicate, value) {
	return true;
};

// XXX XXX XXX TAF MkIII ACTIONS XXX XXX XXX

TafLodlive.prototype = new TafAction();
function TafLodlive () {
	TafAction.call(this);
}








//XXX XXX XXX ACTIONS DECLARE BELOW THIS LINE XXX XXX XXX

// RELFINDER LINKS

var dbpv_taf_relfinder = new TafAction();

dbpv_taf_relfinder.id = "relfinder";
dbpv_taf_relfinder.description = "View more relations on RelFinder";

dbpv_taf_relfinder.check = function (about, predicate, value) {
	var dbp = "http://dbpedia.org/resource/";
	return value.type == "uri" && (value.uri.substring(0, dbp.length) == dbp);
};

dbpv_taf_relfinder.display = function (about, predicate, value) {
	return "<span class='glyphicon glyphicon-play'></span>";
};

dbpv_taf_relfinder.execute = function (about, predicate, value) {
	//generate URL
	var dbp = "http://dbpedia.org/resource/";
	var nameA = about.uri.substring(dbp.length, about.uri.length);
	var nameB = value.uri.substring(dbp.length, value.uri.length);
	var urlA = about.uri;
	var urlB = value.uri;
	if (predicate.reverse) {
		var nameC = nameA;
		nameA = nameB;
		nameB = nameC;
		nameC = urlA;
		urlA = urlB;
		urlB = nameC;
	}
	var pieces = [];
	pieces.push("http://www.visualdataweb.org/relfinder/demo.swf");
	pieces.push("?");
	pieces.push("obj1="+dbpv_taf_relfinder.to64(nameB+"|"+urlB));
	pieces.push("&obj2="+dbpv_taf_relfinder.to64(nameA+"|"+urlA));

	pieces.push("&name="+dbpv_taf_relfinder.to64("DBpedia"));
	pieces.push("&abbreviation="+dbpv_taf_relfinder.to64("dbp"));
	pieces.push("&description="+dbpv_taf_relfinder.to64("Linked Data version of Wikipedia"));
	pieces.push("&endpointURI="+dbpv_taf_relfinder.to64("http://dbpedia.org/sparql")) //XXX XXX
	pieces.push("&dontAppendSPARQL="+dbpv_taf_relfinder.to64("true"));
	pieces.push("&defaultGraphURI="+dbpv_taf_relfinder.to64("http://dbpedia.org"));
	pieces.push("&isVirtuoso="+dbpv_taf_relfinder.to64("true"));
	pieces.push("&useProxy=ZmFsc2U=&method=UE9TVA==&autocompleteLanguage=ZW4=&autocompleteURIs=aHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hI2xhYmVs&ignoredProperties=aHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zI3R5cGUsaHR0cDovL3d3dy53My5vcmcvMjAwNC8wMi9za29zL2NvcmUjc3ViamVjdCxodHRwOi8vZGJwZWRpYS5vcmcvcHJvcGVydHkvd2lraVBhZ2VVc2VzVGVtcGxhdGUsaHR0cDovL2RicGVkaWEub3JnL3Byb3BlcnR5L3dvcmRuZXRfdHlwZSxodHRwOi8vZGJwZWRpYS5vcmcvcHJvcGVydHkvd2lraWxpbmssaHR0cDovL3d3dy53My5vcmcvMjAwMi8wNy9vd2wjc2FtZUFzLGh0dHA6Ly9wdXJsLm9yZy9kYy90ZXJtcy9zdWJqZWN0&abstractURIs=aHR0cDovL2RicGVkaWEub3JnL29udG9sb2d5L2Fic3RyYWN0&imageURIs=aHR0cDovL2RicGVkaWEub3JnL29udG9sb2d5L3RodW1ibmFpbCxodHRwOi8veG1sbnMuY29tL2ZvYWYvMC4xL2RlcGljdGlvbg==&linkURIs=aHR0cDovL3B1cmwub3JnL29udG9sb2d5L21vL3dpa2lwZWRpYSxodHRwOi8veG1sbnMuY29tL2ZvYWYvMC4xL2hvbWVwYWdlLGh0dHA6Ly94bWxucy5jb20vZm9hZi8wLjEvcGFnZQ==&maxRelationLegth=Mg==");

/*	pieces.push("&useProxy="+dbpv_taf_relfinder.to64("false"));
	pieces.push("&method="+dbpv_taf_relfinder.to64("POST"));
	pieces.push("&autocompleteLanguage="+dbpv_taf_relfinder.to64("en"));
	pieces.push("&autocompleteURIs="+dbpv_taf_relfinder.to64("http://www.w3.org/2000/01/rdf-schema#label"));
	pieces.push("&ignoredProperties="+dbpv_taf_relfinder.to64("http://dbpedia.org/property/wikiPageUsesTemplate, http://dbpedia.org/property/wikilink, http://dbpedia.org/property/wordnet_type, http://www.w3.org/1999/02/22-rdf-syntax-ns#type, http://www.w3.org/2004/02/skos/core#subject"));
	pieces.push("&abstractURIs="+dbpv_taf_relfinder.to64("http://dbpedia.org/ontology/abstract"));
	pieces.push("&imageURIs="+dbpv_taf_relfinder.to64("http://dbpedia.org/ontology/thumbnail, http://xmlns.com/foaf/0.1/depiction"));
	pieces.push("&linkURIs="+dbpv_taf_relfinder.to64("http://purl.org/ontology/mo/wikipedia, http://xmlns.com/foaf/0.1/homepage, http://xmlns.com/foaf/0.1/page"));
	pieces.push("&maxRelationLength="+dbpv_taf_relfinder.to64("2"));*/
	window.open(pieces.join(""));
};

dbpv_taf_relfinder.to64 = function (input) {
var keyStr = "ABCDEFGHIJKLMNOP" +
	               "QRSTUVWXYZabcdef" +
	               "ghijklmnopqrstuv" +
	               "wxyz0123456789+/" +
	               "=";
	//input = escape(input);
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	 
	do {
		chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);
	 
	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;
	 
	        if (isNaN(chr2)) {
			enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
			enc4 = 64;
	        }
	 
	        output = output +
			keyStr.charAt(enc1) +
			keyStr.charAt(enc2) +
			keyStr.charAt(enc3) +
			keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	     } while (i < input.length);
	 
	return output;
};


// SPOTLIGHT ANNOTATIONS

var dbpv_taf_spotlight = new TafAction();

dbpv_taf_spotlight.id = "spotlight";
dbpv_taf_spotlight.description = "Annotate with DBpedia Spotlight";

dbpv_taf_spotlight.initialize = function (about, predicate, value) {
	value.taf.spotlight.busy = false;

	if (dbpv_taf_spotlight.service === undefined) {
		dbpv_taf_spotlight.service = angular.element("body").injector().get('Spotlight');
	}
};

dbpv_taf_spotlight.check = function (about, predicate, value) {
	return value.type == "literal" && value.value.length>50;
};

dbpv_taf_spotlight.display = function (about, predicate, value) {
	//alert(JSON.stringify(value.taf.spotlight));
	if (value.taf.spotlight.busy) {
		return "<span class='glyphicon glyphicon-time'></span>";
	}else{
		return "<span class='glyphicon glyphicon-bullhorn'></span>";
	}
};

dbpv_taf_spotlight.execute_callback = function (data, value) {
	value.taf.spotlight.busy = false;
	if (data !== undefined && data["Resources"] !== undefined) {
		var annotations = data["Resources"];
		var text = value.value;
		var previndex = 0;
		var pieces = [];
		for (var i = 0; i<annotations.length; i++) {
			var annotation = annotations[i];
			var offset = parseInt(annotation["@offset"]);
			var len = annotation["@surfaceForm"].length;
			var link = annotation["@URI"];
			link = dbpv_preprocess_triple_url(link);
			link = '<a dbpv-preview="'+link+'" href="'+link+'">';
			pieces.push(text.substring(previndex, offset));
			pieces.push(link+text.substr(offset, len)+"</a>");
			previndex = offset+len;
		}
		pieces.push(text.substr(previndex));
		value.label = pieces.join("");
		$compile(value.label);
	}

	//value.label = JSON.stringify(data);
	//alert(JSON.stringify(pieces));
};

dbpv_taf_spotlight.execute = function (about, predicate, value) {
	if (!value.taf.spotlight.busy) {
		dbpv_taf_spotlight.service.annotate_async(value.value, dbpv_taf_spotlight.execute_callback, value);
		value.taf.spotlight.busy = true;
	} else {
		alert("Annotation request to the DBpedia Spotlight API is already pending");
	}
};


// AUTO-EXECUTING ACTION ENABLING A MAP AND SHOWING COORDINATES THERE

var dbpv_taf_prettymap = new TafAction();

dbpv_taf_prettymap.id = "prettymap";
dbpv_taf_prettymap.description = "Pretty Map";

dbpv_taf_prettymap.initialize = function (about, predicate, value) {
	if (dbpv_taf_prettymap.check (about, predicate, value)) {
		dbpv_taf_prettymap.execute (about, predicate, value);
	}
};

dbpv_taf_prettymap.check = function (about, predicate, value) {
	if (predicate.uri == "http://www.georss.org/georss/point") {
		return true;
	}else {
		return false;
	}
};

dbpv_taf_prettymap.display = function (about, predicate, value) {
	return "";
};

dbpv_taf_prettymap.execute = function (about, predicate, value) {
//	alert("building map");
	var coord = value.value;
	var matches = coord.match(/([-+]?([0-9]*\.[0-9]+|[0-9]+))\s([-+]?([0-9]*\.[0-9]+|[0-9]+))/);
	var lon = matches[1];
	var lat = matches[3];
	coord = [lon, lat];
	$('#dbpvpmap').attr("class", "dbpvpmap-active");
//	$('#dbpvpmapcontainer').html("<leaflet></leaflet>");
	var map = L.map('dbpvpmap').setView(coord, 10);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
	L.marker(coord).addTo(map);

};


// SHOW THE TYPES IN PRETTY BOX

var dbpv_taf_pretty_types = new TafAction();
dbpv_taf_pretty_types.id = "prettytypes";
dbpv_taf_pretty_types.description = "Extracts types to display in pretty box";

dbpv_taf_pretty_types.initialize = function (about, predicate, value) {
	if (dbpv_taf_pretty_types.check (about, predicate, value)) {
		dbpv_taf_pretty_types.execute (about, predicate, value);
	}
};

dbpv_taf_pretty_types.check = function (about, predicate, value) {
	if (predicate.uri == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
		return (value.prefix !== undefined && value.prefix == "dbpedia-owl");
	}else{
		return false;
	}
};

dbpv_taf_pretty_types.display = function(about, predicate, value){
	return "";
};

dbpv_taf_pretty_types.execute = function (about, predicate, value) {
	var scope = angular.element(document.getElementById('pretty-box')).scope();
	if (scope.dbpvp.types === undefined) {
		scope.dbpvp.types = [];
	}
	scope.dbpvp.types.push("<span label-list='"+value.url+"'>"+value.short+"</span>");
};

// SHOW LINKS IN PRETTY BOX
var dbpv_taf_pretty_links = new TafAction();
dbpv_taf_pretty_links.id = "prettylinks";
dbpv_taf_pretty_links.description = "Extracts links to display in pretty box";

dbpv_taf_pretty_links.initialize = function (about, predicate, value) {
	if (dbpv_taf_pretty_links.check (about, predicate, value)) {
		dbpv_taf_pretty_links.execute(about, predicate, value);
	}
};

dbpv_taf_pretty_links.check = function (about, predicate, value) {
	if (predicate.uri == "http://xmlns.com/foaf/0.1/isPrimaryTopicOf" || predicate.uri == "http://www.w3.org/2002/07/owl#sameAs") {
		return true;
	}else{
		return false;
	}
};

dbpv_taf_pretty_links.display = function (about, predicate, value) {
	return "";
};

dbpv_taf_pretty_links.execute = function (about, predicate, value) {
	var scope = angular.element(document.getElementById("pretty-box")).scope();
	if (scope.dbpvp.links === undefined) {
		scope.dbpvp.links = [];
	}
	var freebaseprefix = "http://rdf.freebase.com/";
	if(value.uri.indexOf("wikipedia") != -1){
		scope.dbpvp.links.push("<a href='"+value.uri+"'>Wikipedia</a>");
	}else if (value.uri.substring(0, freebaseprefix.length) == freebaseprefix) {
		scope.dbpvp.links.push("<a href='"+value.uri+"'>Freebase</a>");
	}
};
// VIEW IN LODLIVE (only for DBpedia entities) (example of a simple action)

var dbpv_taf_lodlive =  new TafAction();

dbpv_taf_lodlive.id = "lodlive";
dbpv_taf_lodlive.description = "View in LODLive";

dbpv_taf_lodlive.check = function (about, predicate, value) {
	return value.type == "uri" && value.prefix == "dbpedia";
};

dbpv_taf_lodlive.display = function (about, predicate, value) {
	return "<span class='glyphicon glyphicon-globe'></span>";
};

dbpv_taf_lodlive.execute = function (about, predicate, value) {
	var lodurl = "http://en.lodlive.it/?";
	window.open(lodurl+value.uri);
};


// EXAMPLE OF AN ACTION WITH LOCAL STATE
/*var dbpv_taf_dummy = new TafAction();

dbpv_taf_dummy.id = "dummy";

dbpv_taf_dummy.display_inactive = "<span class='glyphicon glyphicon-play'></span>";
dbpv_taf_dummy.display_active = "<span class='glyphicon glyphicon-cog'></span>";


dbpv_taf_dummy.initialize = function (about, predicate, value) {
	value.taf.dummy.active = false;
};

dbpv_taf_dummy.check = function (about, predicate, value) {			 //return Boolean whether applicable or not
	return value.type!="uri";
};

dbpv_taf_dummy.display = function (about, predicate, value) {
	if (value.taf.dummy.active) {
		return dbpv_taf_dummy.display_active;
	}else{
		return dbpv_taf_dummy.display_inactive;
	}
};

dbpv_taf_dummy.execute = function (about, predicate, value) {			 // called when user clicks the action button
	if (value.taf.dummy.active) {
		value.label += "_tss";
		value.taf.dummy.active = false;
	}else{
		value.label += "_badum";
		value.taf.dummy.active = true;
	}
};

// EXAMPLE OF AN ACTION WITH GLOBAL STATE
/*var dbpv_taf_global = new TafAction();

dbpv_taf_global.id = "global";
dbpv_taf_global.clicks = 0;

dbpv_taf_global.display_inactive = "<span class='glyphicon glyphicon-search'></span>";
dbpv_taf_global.display_active = "<span class='glyphicon glyphicon-qrcode'></span>";

dbpv_taf_global.initialize = function (about, predicate, value) {
	value.taf.global.active = false;
};

dbpv_taf_global.check = function (about, predicate, value) {
	return dbpv_taf_global.clicks < 4 && value.type == "uri";
};

dbpv_taf_global.display = function (about, predicate, value) {
	if (dbpv_taf_global.clicks % 2 == 0) {
		return dbpv_taf_global.display_active;
	}else{
		return dbpv_taf_global.display_inactive;
	}
};

dbpv_taf_global.execute = function (about, predicate, value) {
	dbpv_taf_global.clicks += 1;
};
*/
