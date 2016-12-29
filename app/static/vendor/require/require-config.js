// JavaScript Document
var require = {
	baseUrl: '../../static',
    shim : {
        "bootstrap" : { "deps": ['jquery', 'handlebars'] }
    },
    paths: {
        "jquery" : "/jquery/dist/jquery.min",
        "handlebars": "/static/vendor/handlebars-v4.0.5",
        "bootstrap" :  "/bootstrap/dist/js/bootstrap.min",
        "element": "config/element",
        "structure": "config/structure",
        "input": "components/input/input"        
    }
};
