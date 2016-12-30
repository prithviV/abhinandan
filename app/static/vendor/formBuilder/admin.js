jQuery(document).ready(function($) {
  var Builder = function(){};
  Builder.prototype = {

    init: function(){
      this.formBuilder();
      this.uniqueId = this.getUniqueId();
      this.formData = [];
      this.saveButton = null;
      
    },

    formBuilder: function(){

      var that = this;
      var fbOptions = {
        dataType: 'json'
      };
      
      var formBuilder = $('#builder');
      if (formBuilder.length) {
        
        var formId = formBuilder.attr('data-request-form');
        //EDIT MODE
        if (formId) {
          that.loadData(formId, function(data){
            console.log('asdf');
            that.formData = JSON.stringify(data.CONTENT);
            fbOptions.formData = that.formData;
            this.uniqueId = data.ID;
            formBuilder = formBuilder.formBuilder(fbOptions).data('formBuilder');
            that.saveButton = $('.form-builder-save');
            
            that.saveButton.click(function() {
              that.formData = JSON.parse(formBuilder.formData);
              that.saveData($(this), that.formData);
            });
            that.manageTabs();
          });

        } else {
          formBuilder = formBuilder.formBuilder(fbOptions).data('formBuilder');
          that.saveButton = $('.form-builder-save');
          
          that.saveButton.click(function() {
            that.formData = JSON.parse(formBuilder.formData);
            that.saveData($(this), that.formData);
          });
          that.manageTabs();
        }
      }
    },
    //save table data
    saveData: function(button, formData) {
      
      var that = this;
      $.ajax({
          url: '/admin/saveForm',
          type: 'post',
          data: {ID: that.uniqueId, CONTENT: formData},
          beforeSend: function(){
            button.button('loading');
          },
          success: function(data){
              console.log(data);
          },
          error: function(err){
              console.log(err);
          },
          complete: function(){
            button.button('reset');
          }
      });
    },
    //load data from the server for a particular id
    loadData: function(formID, callback) {
      var that = this;
      $.ajax({
          url: '/admin/edit',
          data: {ID: formID},
          type: 'post',
          success: function(data){
              callback.apply(that, arguments);
          },
          error: function(err){
              console.log(err);
          },
          complete: function(){
            
          }
      });
    },

    getUniqueId: function(){
      //this works fine for now
        var date = new Date();
        var components = [
            date.getYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ];

        return components.join("");  
    },
    manageTabs: function() {
      var that = this;
      
      var builderPreview = $("#builderPreview");
      $('#builderTabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if (e.currentTarget.hash == '#previewMode') {
          builderPreview.formRender({
            dataType: 'json',
            formData: that.formData
          })
        };
      });
    }



  };

  var builder = new Builder().init();

});
