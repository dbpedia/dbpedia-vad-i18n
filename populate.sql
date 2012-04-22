

select 'Settings registry values...';
registry_set('dbp_decode_iri','on');
registry_set('dbp_domain','http://el.dbpedia.org');
registry_set('dbp_graph', 'http://el.dbpedia.org');
registry_set('dbp_lang', 'el');
registry_set('dbp_DynamicLocal', 'off');
registry_set('dbp_category', 'Κατηγορία');
registry_set('dbp_imprint', 'http://wiki.el.dbpedia.org/Imprint');
registry_set('dbp_website','http://wiki.el.dbpedia.org/');
registry_set('dbp_lhost', ':80');
registry_set('dbp_vhost', 'el.dbpedia.org');

select 'Disabling indexing...';
--# set index mode to manual
DB.DBA.VT_BATCH_UPDATE ('DB.DBA.RDF_OBJ', 'ON', NULL);

select 'Clearing graph...';
SPARQL CLEAR GRAPH <http://el.dbpedia.org>;

select 'dbpedia owl';
DB.DBA.RDF_LOAD_RDFXML (gz_file_open('/data/dbpedia/dbpedia_3.7.owl'), 'http://el.dbpedia.org', 'http://el.dbpedia.org');

select 'article_categories';
TTLP(gz_file_open('/data/dbpedia/article_categories_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/article_categories_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'category_labels_el';
TTLP(gz_file_open('/data/dbpedia/category_labels_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/category_labels_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'disambiguations_el';
TTLP(gz_file_open('/data/dbpedia/disambiguations_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/disambiguations_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'external_links_el';
TTLP(gz_file_open('/data/dbpedia/external_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/external_links_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'geo_coordinates_el';
TTLP(gz_file_open('/data/dbpedia/geo_coordinates_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/geo_coordinates_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'homepages_el';
TTLP(gz_file_open('/data/dbpedia/homepages_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/homepages_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'images_el';
TTLP(gz_file_open('/data/dbpedia/images_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/images_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'infobox_properties_el';
TTLP(gz_file_open('/data/dbpedia/infobox_properties_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/infobox_properties_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'infobox_property_definitions_el';
TTLP(gz_file_open('/data/dbpedia/infobox_property_definitions_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/infobox_property_definitions_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'instance_types_el';
TTLP(gz_file_open('/data/dbpedia/instance_types_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/instance_types_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'interlanguage_links_el';
TTLP(gz_file_open('/data/dbpedia/interlanguage_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/interlanguage_links_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'labels_el';
TTLP(gz_file_open('/data/dbpedia/labels_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/labels_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'long_abstracts_el';
TTLP(gz_file_open('/data/dbpedia/long_abstracts_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/long_abstracts_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'mappingbased_properties_el';
TTLP(gz_file_open('/data/dbpedia/mappingbased_properties_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/mappingbased_properties_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'page_ids_el';
TTLP(gz_file_open('/data/dbpedia/page_ids_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/page_ids_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'redirects_el';
TTLP(gz_file_open('/data/dbpedia/redirects_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/redirects_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'revisions_el';
TTLP(gz_file_open('/data/dbpedia/revisions_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/revisions_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'short_abstracts_el';
TTLP(gz_file_open('/data/dbpedia/short_abstracts_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/short_abstracts_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'skos_categories_el';
TTLP(gz_file_open('/data/dbpedia/skos_categories_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/skos_categories_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'specific_mappingbased_properties_el';
TTLP(gz_file_open('/data/dbpedia/specific_mappingbased_properties_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/specific_mappingbased_properties_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'templateParameters_el';
TTLP(gz_file_open('/data/dbpedia/templateParameters_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/templateParameters_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'wikipedia_links_el';
TTLP(gz_file_open('/data/dbpedia/wikipedia_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/wikipedia_links_el.nq.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 768);

select 'sameas triples...';
TTLP(gz_file_open('/data/dbpedia/sameas-de-el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/sameas-en-el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/sameas-ru-el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/sameas-pt-el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);

select 'external datasets';
TTLP(gz_file_open('/data/dbpedia/links/bookmashup_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/dailymed_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/dblp_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/DBpedia-LGD_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/diseasome_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/drugbank_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/eunis_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/eurostat_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/factbook_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/flickrwrapper_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/freebase_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/geonames_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/geospecis_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/gutenberg_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/linkedmdb_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/musicbrainz_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/nytimes_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/opencyc_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/revyu_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/sider_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/tcm_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/umbel_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/uscensus_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/wikicompany_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/wordnet_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);
TTLP(gz_file_open('/data/dbpedia/links/yago_links_el.nt.gz'), 'http://el.dbpedia.org', 'http://el.dbpedia.org', 512);


--# load new data
--ld_dir('/data/dbpedia','*.owl','http://el.dbpedia.org');
--rdf_loader_run ();

--ld_dir('/data/dbpedia','*.nt','http://el.dbpedia.org');
--rdf_loader_run ();

--ld_dir('/data/dbpedia','*.nq','http://el.dbpedia.org');
--rdf_loader_run ();

--ld_dir('/data/dbpedia','*.gz','http://el.dbpedia.org');
--rdf_loader_run ();

--ld_dir('/data/dbpedia/links','*.nt','http://el.dbpedia.org');
--rdf_loader_run ();

--ld_dir('/data/dbpedia/links','*.gz','http://el.dbpedia.org');
--rdf_loader_run ();



--# re-enable auto-index
DB.DBA.RDF_OBJ_FT_RULE_ADD (null, null, 'All');
DB.DBA.VT_INC_INDEX_DB_DBA_RDF_OBJ ();

--#unlock server

