//javascript
define(['jquery', 'input'], function($, input){
    var builder = $('#builder');

    $('.list-group-item').click(function(){
       builder.append(input.getView());
    });
});