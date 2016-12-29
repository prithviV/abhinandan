// JavaScript Document
define(['jquery', 'element'], function($, Element){
    var Input = function(){};
    Input.prototype = Object.create(Element.prototype);
    Input.prototype.configuration = {
        label: {
            type: 'string',
            value: 'Label Name'
        },
        element: {
            type: 'hidden',
            value: 'input'
        },
        type: {
            type: 'string',
            value: 'text'
        },
        name: {
            type: 'string',
            value: 'default_NAME'
        },
        id: {
            type: 'string',
            value: 'default_ID'
        },
        required: {
            type: 'string',
            value: 'Label'
        },
        placeholder: {
            type: 'string',
            value: 'placeholder'
        },
        value: {
            type: 'string',
            value: ''
        },
        'width': {
            type: 'select',
            value: 'col-md-12',
            options: {
                'col-md-1': '1',
                'col-md-2': '2',
                'col-md-3': '3',
                'col-md-4': '4',
                'col-md-5': '5',
                'col-md-6': '6',
                'col-md-7': '7',
                'col-md-8': '8',
                'col-md-9': '9',
                'col-md-10': '10',
                'col-md-11': '11',
                'col-md-12': '12'
            }
        }
    };
    window.Elements.input = Input;
return Input;
});