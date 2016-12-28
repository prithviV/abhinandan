// JavaScript Document
define(['jquery', 'handlebars'], function($, handlebars){
    
    var configuration =  {
        label: {
            type: 'string',
            value: 'Label'
        },
        element: {
            type: 'hidden',
            value: 'input'
        },
        name: {
            type: 'string',
            value: 'Label'
        },
        id: {
            type: 'string',
            value: 'Label'
        },
        required: {
            type: 'string',
            value: 'Label'
        },
        placeholder: {
            type: 'string',
            value: 'Label'
        },
        'width': {
            type: 'select',
            value: '12',
            options: {
                'colmd01': '1',
                'colmd02': '2',
                'colmd03': '3',
                'colmd04': '4',
                'col-md-5': '5',
                'col-md-6': '6',
                'col-md-7': '7',
                'col-md-8': '8',
                'col-md-9': '9',
                'col-md-10': '10',
                'col-md-11': '11',
                'col-md-12': '12',
            }
        }

    };

    return {
        getConfig: function() {
            return config;
        },
        getView: function( config ){
            var template = '';
            if ( !config ) {
                config = configuration;
            }
            
           $.ajax({
                url : 'static/components/input/input.handlebars',
                success : function (data) {
                    template = handlebars.compile(data);
                },
                error: function(error){
                    template = 'Unable to load the required element'
                },
                dataType: "text",
                async : false
            });
        return template(config);
        },
        getHtml: function( config ) {
            
        }
    };

})