//javascript
define(['jquery', 'bootstrap', 'formBuilder', 'formRender'], function($, build, render){
    console.log($('#builder'));
    var options = {
      formData: '[{"type":"text", "label":"Text Input"}]',
      dataType: 'json',
      sortable: false
    };
$('#builder').formBuilder(options);
});