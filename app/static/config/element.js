// JavaScript Document
define( ['jquery', 'handlebars'], function($, Handlebars){
    var Element = function(){};

    Element.prototype.configuration = {
        element: {
            type: 'hidden',
            value: 'element'
        }
    };
    Element.prototype.getConfig = function() {
        //configuration to be set in individual element
        var _this = this;
        var config = {};
        
        $.each(_this.configuration, function(attr, values){
            config[attr] = values.value;
        });
        
        return config;
    };
    Element.prototype.getName = function(){
        return this.configuration.element.value;
    };
    Element.prototype.getViewPath = function(){
        return 'static/components/' + this.getName() + "/" + this.getName() + '.handlebars';
    };
    Element.prototype.getView = function(config){
        var _this = this;
        var template = '';
        if ( !config ) {
            config = this.getConfig();
        }

        $.get({
            url : 'static/components/input/input.handlebars',
            success : function (data) {
                console.log(_this.getConfig())
                template = Handlebars.compile(data)(_this.getConfig());
                
            },
            error: function(error){
                template = 'Unable to load the required element';
            },
            dataType: "text",
            async : false
        });
        return template;
    } 
    window.Elements = {};
    return Element;
})