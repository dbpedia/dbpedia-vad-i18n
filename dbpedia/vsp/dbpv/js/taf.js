var dbpv_taf_actions = [];

function tafAdd(action) {
	dbpv_taf_actions.push(action);
}

function TafAction(obj) {
	$.extend(this, obj);
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
dbpv_taf_relfinder.name = "RelFinder";
dbpv_taf_relfinder.description = "View more relations on RelFinder";

dbpv_taf_relfinder.legendize = function() {
	return [{"icon": this.display, "text": "Explore relations with this entity on RelFinder"}];
};

dbpv_taf_relfinder.check = function (about, predicate, value) {
	var checkregex = new RegExp("^http\:\/\/([a-z-]+\.)?dbpedia\.org\/resource\/.+$");
	return value.type == "uri" && (checkregex.exec(value.uri)[1] == checkregex.exec(about.uri)[1]);
};

dbpv_taf_relfinder.display = function (about, predicate, value) {
	return "<span class='dbpvicon dbpvicon-relfinder'></span>";
};

dbpv_taf_relfinder.execute = function (about, predicate, value) {
	//generate URL
	var neregex = new RegExp("^http\:\/\/([a-z-]+\.)?dbpedia\.org\/resource\/(.+)$");
	var nameA = encodeURIComponent(neregex.exec(about.uri)[2]);
	var lang = neregex.exec(about.uri)[1];
	if (lang === undefined) {
		lang = "";
	}
	var nameB = encodeURIComponent(neregex.exec(value.uri)[2]);
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
	pieces.push("&endpointURI="+dbpv_taf_relfinder.to64("http://"+lang+"dbpedia.org/sparql")) //XXX XXX
	pieces.push("&dontAppendSPARQL="+dbpv_taf_relfinder.to64("true"));
	pieces.push("&defaultGraphURI="+dbpv_taf_relfinder.to64("http://"+lang+"dbpedia.org"));
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
dbpv_taf_spotlight.name = "DBpedia Spotlight";
dbpv_taf_spotlight.description = "Annotate with DBpedia Spotlight";

dbpv_taf_spotlight.legendize = function () {
	return [
			{ "icon": "<span class='glyphicon glyphicon-bullhorn'></span>",
			  "text": "Annotates the value text using DBpedia Spotlight"},
			{ "icon": "<span class='glyphicon glyphicon-time'></span>",
			  "text": "A request to the DBpedia Spotlight endpoint is already pending. Just wait"}
			];
};

dbpv_taf_spotlight.initialize = function (about, predicate, value) {
	value.taf.spotlight.busy = false;

	if (dbpv_taf_spotlight.service === undefined) {
		dbpv_taf_spotlight.service = angular.element("body").injector().get('Spotlight');
	}
	if (dbpv_taf_spotlight.noti === undefined) {
		dbpv_taf_spotlight.noti = angular.element("#notifications").scope();
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
		/*if (value["xml:lang"] != "en") {
			dbpv_taf_spotlight.noti.addNotification("DBpedia Spotlight is made for English.\n Annotations retrieved for this language may be incorrect", 7000);
		}*/
	} else {
		dbpv_taf_spotlight.noti.addNotification("Annotation request to the DBpedia Spotlight API is already pending", 5000);
	}
};

// AUTO-EXECUTING ACTION FOR REDIRECTS

var dbpv_taf_redirect = new TafAction();

dbpv_taf_redirect.id = "redirect";
dbpv_taf_redirect.description = "Auto Redirect";

dbpv_taf_redirect.initialize = function (about, predicate, value) {
	if (dbpv_taf_redirect.check (about, predicate, value)) {
		dbpv_taf_redirect.execute (about, predicate, value);
	}
};

dbpv_taf_redirect.check = function (about, predicate, value) {
	if (predicate.uri == "http://dbpedia.org/ontology/wikiPageRedirects" && predicate.reverse==false) {
		return true;
	}else {
		return false;
	}
};

dbpv_taf_redirect.display = function (about, predicate, value) {
	return "";
};

dbpv_taf_redirect.execute = function (about, predicate, value) {
	window.location = value.url;
	//window.location = "/#"+value.url;
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
	var micon = L.icon({
		iconUrl: '/statics/css/marker-icon.png',
		shadowUrl:	'/statics/css/marker-shadow.png',
		iconSize:	[25, 41],
		shadowSize:	[41, 41],
		iconAnchor:	[13, 40],
		shadowAnchor: [13,40],
		popupAnchor:  [-3, -50]
	});
	L.marker(coord, {icon: micon}).addTo(map);

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

// SHOW LINKS IN PRETTY BOX (ONLY FORWARD!!!)
var dbpv_taf_pretty_links = new TafAction();
dbpv_taf_pretty_links.id = "prettylinks";
dbpv_taf_pretty_links.description = "Extracts links to display in pretty box";

//mappings: {predicate match regex, value match regex, label transform regex}
dbpv_taf_pretty_links.mappings = [
				{
				"predex": new RegExp("^http\:\/\/xmlns.com\/foaf\/0\.1\/isPrimaryTopicOf$"), 
				"valuex": new RegExp(".*wikipedia.*"), 
				"label": "wikipedia",
				"labelx": new RegExp("http\:\/\/([a-z-]+\.wikipedia\.org\/.+)")
				},
				{
				"predex": new RegExp("^http\:\/\/www\.w3\.org\/2002\/07\/owl\#sameAs$"), 
				"valuex": new RegExp(".*dbpedia\.org.*"), 
				"label": "dbpedia",
				"labelx": new RegExp("http\:\/\/([a-z-]+\.dbpedia)\.org\/resource(\/.+)")
				},
				{
				"predex": new RegExp("^http\:\/\/www\.w3\.org\/2002\/07\/owl\#sameAs$"), 
				"valuex": new RegExp(".*freebase\.com.*"), 
				"label": "freebase",
				"labelx": new RegExp("^http\:\/\/(.+)$")
				}
				];


dbpv_taf_pretty_links.initialize = function (about, predicate, value) {
	if (dbpv_taf_pretty_links.check (about, predicate, value)) {
		dbpv_taf_pretty_links.execute(about, predicate, value);
	}
};

dbpv_taf_pretty_links.check = function (about, predicate, value) {
	if (predicate.reverse) return false;
	for (var i = 0; i<dbpv_taf_pretty_links.mappings.length; i++) {
		var mapping = dbpv_taf_pretty_links.mappings[i];
		if (mapping.predex.test(predicate.uri) && mapping.valuex.test(value.uri)) {
			value.taf.prettylinks.labelx = mapping.labelx;
			value.taf.prettylinks.label = mapping.label;
			return true;
		}
	}
	return false;
};

dbpv_taf_pretty_links.display = function (about, predicate, value) {
	return "";
};

dbpv_taf_pretty_links.execute = function (about, predicate, value) {
	var scope = angular.element(document.getElementById("pretty-box")).scope();
	if (scope.dbpvp.links === undefined) {
		scope.dbpvp.links = {};
	}
	var item = {"url":value.uri};
	var matches = value.taf.prettylinks.labelx.exec(value.uri);
	matches = matches.slice(1);
	item.label = matches.join("");
	if (scope.dbpvp.links[value.taf.prettylinks.label] === undefined) {
		scope.dbpvp.links[value.taf.prettylinks.label] = [];
	}
	scope.dbpvp.links[value.taf.prettylinks.label].push(item);
};


// AUTO-EXECUTING TO POPULATE SHORTCUTS

var dbpv_taf_short = new TafAction();

dbpv_taf_short.id = "short";
dbpv_taf_short.description = "Add Shortcuts to shortcut box";

	//$scope.addShortcut ("http://www.w3.org/1999/02/22-rdf-syntax-ns#type", "RDF Types", 1);
	//$scope.addShortcut ("http://purl.org/dc/terms/subject", "Categories", 2);

dbpv_taf_short.mappings =
		{
			"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
				"reverse": false,
				"label": "TYPES",
				"prio": 10
			},
			"http://purl.org/dc/terms/subject": {
				"reverse": false,
				"label": "CATEGORIES",
				"prio": 11
			},
			"http://dbpedia.org/ontology/galleryItem": {
				"reverse": false,
				"label": "GALLERY",
				"prio": 9
			},
			"http://dbpedia.org/ontology/wikiPageExternalLink": {
				"reverse": false,
				"label": "External Links",
				"prio": 8
			},
			"http://www.w3.org/2002/07/owl#sameAs": {
				"reverse": false,
				"label": "Same As",
				"prio": 7
			},
			"http://dbpedia.org/ontology/birthPlace": {
				"reverse": true,
				"label": "Born Here",
				"prio": 1
			},
			"http://dbpedia.org/ontology/starring": {
				"reverse": true,
				"label": "Starred in",
				"prio": 1
			}
		};

dbpv_taf_short.check = function (about, predicate, value) {
	for (var url in dbpv_taf_short.mappings) {
		if (predicate.uri == url && predicate.reverse == dbpv_taf_short.mappings[url].reverse) {
			return true;
		}
	}
	return false;
};

dbpv_taf_short.initialize = function (about, predicate, value) {
	if (dbpv_taf_short.check (about, predicate, value)) dbpv_taf_short.execute (about, predicate, value);
};

dbpv_taf_short.display = function (about, predicate, value) {
	return "";
};

dbpv_taf_short.execute = function (about, predicate, value) {
	dbpv_taf_short.shortcuts = angular.element("#shortcuts").scope();
	dbpv_taf_short.shortcuts.addShortcut (predicate.url, dbpv_taf_short.mappings[predicate.uri].label, dbpv_taf_short.mappings[predicate.uri].prio);
};


// VIEW IN LODLIVE (only for DBpedia entities) (example of a simple action)

var dbpv_taf_lodlive =  new TafAction();

dbpv_taf_lodlive.id = "lodlive";
dbpv_taf_lodlive.name = "LODlive";
dbpv_taf_lodlive.description = "View in LODLive";

dbpv_taf_lodlive.legendize = function (about, predicate, value) {
	return [{"icon": this.display, "text": "View in LODLive"}];
};

dbpv_taf_lodlive.check = function (about, predicate, value) {
	return value.type == "uri" && (value.prefix.indexOf("dbpedia") == 0);
};

dbpv_taf_lodlive.display = function (about, predicate, value) {
	return "<span class='dbpvicon dbpvicon-lodlive'></span>";
};

dbpv_taf_lodlive.execute = function (about, predicate, value) {
	var lodurl = "http://en.lodlive.it/?";
	window.open(lodurl+value.uri);
};

// WIKIPEDIA ACTION (only for DBpedia entities)
var dbpv_taf_wikipedia = new TafAction({
	id: 			"wikipedia",
	name:			"Wikipedia",
	description:	"View on Wikipedia",
	legendize: 		function(about, predicate, value) {
						return [{"icon": this.display, "text": this.description}];
	},
	check: 			function (about, predicate, value) {
						return value.type == "uri" && (value.prefix.indexOf("dbpedia") == 0);
	},
	display: 		function (about, predicate, value) {
						return "<span class='dbpvicon dbpvicon-wikipedia'></span>";
	},
	execute: 		function (about, predicate, value) {
						var regex = /http\:\/\/([a-z-]+\.)?dbpedia\.org\/resource\/(.+)/g;
						var match = regex.exec(value.uri);
						if (match[1] === undefined) match[1] = "";
						var wikilink = "http://"+match[1]+"wikipedia.org/wiki/"+match[2];
						window.open(wikilink);
	}
});


var dbpv_taf_dbtemplate = new TafAction({
	id: 			"dbtemplate",
	name:			"DBpedia Template",
	description:	"View DBpedia mapping",
	templatestr:	function() {
						return angular.element("body").scope().templateStr;
					},
	regex:			function() {
						return "(http\\:\\/\\/)?([a-z-]+\\.)?dbpedia\\.org\\/resource\\/"+this.templatestr()+":(.+)";
					},
	legendize: 		function(about, predicate, value) {
						return [{"icon": this.display, "text": this.description}];
	},
	check: 			function (about, predicate, value) {
						var regex = new RegExp(this.regex());
						return value.uri !== undefined && regex.test(value.uri);
	},
	display: 		function (about, predicate, value) {
						return "<span class='glyphicon glyphicon-forward'></span>";
	},
	execute: 		function (about, predicate, value) {
						var regex = new RegExp(this.regex());
						var match = regex.exec(value.uri);
						if (match[2] === undefined) match[2] = "en.";
						var maplink = "http://mappings.dbpedia.org/index.php/Mapping_"+match[2].substring(0, match[2].length-1)+":"+match[3];
						window.open(maplink);
	}
});

// NOFOLLOW SYSTEM ACTION
var dbpv_taf_nofollow = new TafAction();

dbpv_taf_nofollow.id = "nofollow";
dbpv_taf_nofollow.display = function (about, predicate, value) {
	return "";
};

dbpv_taf_nofollow.initialize = function (about, predicate, value) {
	if (dbpv_taf_nofollow.check (about, predicate, value)) dbpv_taf_nofollow.execute (about, predicate, value);
};

dbpv_taf_nofollow.check = function (about, predicate, value) {
	return (predicate.url.match("wikiPageExternalLink") || predicate.url.match("xmlns.com/foaf/0.1/homepage"));
};

dbpv_taf_nofollow.execute = function (about, predicate, value) {
	value.nofollow = "nofollow";
};

// VIEW IN OPENLINK FACETED BROWSER

var dbpv_taf_olfb = new TafAction();

dbpv_taf_olfb.id = "olfb";
dbpv_taf_olfb.name = "OpenLink Faceted Browser";
dbpv_taf_olfb.description = "View in OpenLink Faceted Browser";

dbpv_taf_olfb.legendize = function (about, predicate, value) {
	return [{"icon": this.display, "text": "View in OpenLink Faceted Browser"}];
};

dbpv_taf_olfb.display = function (about, predicate, value) {
	return "<span class='dbpvicon dbpvicon-openlink'></span>";
};

dbpv_taf_olfb.check = function (about, predicate, value) {
	return value.type == "uri" && (value.prefix.indexOf("dbpedia") == 0);
};

dbpv_taf_olfb.execute = function (about, predicate, value) {
	//var servedby = angular.element("body").scope().localgraph;
	var olfburl = /*servedby +*/ "/describe/?uri=";
	window.open(olfburl+about.uri);
};

// DISCLAIMER SYSTEM ACTION
var dbpv_taf_disclaimer = new TafAction();

dbpv_taf_disclaimer.id = "disclaimer";

dbpv_taf_disclaimer.display = function (about, predicate, value) {
	return "";
};

dbpv_taf_disclaimer.initialize = function (about, predicate, value) {
	if (dbpv_taf_disclaimer.check (about, predicate, value)) dbpv_taf_disclaimer.execute (about, predicate, value);
};

dbpv_taf_disclaimer.check = function (about, predicate, value) {
	return (predicate.url.match("http://xmlns.com/foaf/0.1/isPrimaryTopicOf"));
};

dbpv_taf_disclaimer.execute = function (about, predicate, value) {
	var scope = angular.element(".footer").scope();
	scope.wikipage = {};
	scope.wikipage.url = value.url;
	var regex = new RegExp("http:\\/\\/([a-z-]+)\\.wikipedia\\.org\\/wiki\\/(.*)");
	var match = regex.exec(value.url);
	var lang = match[1];
	var title = match[2];
	scope.wikipage.title = title;
	scope.wikipage.history = "http://" + lang + ".wikipedia.org/w/index.php?title=" + title + "&action=history";
};
