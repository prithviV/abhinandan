//javascript
define(['jquery', 'input', 'element'], function($, input){
    var builder = $('#builder');
    var Structure = {
        selected: null,
        content: [],
        container: $('#builder'),
        uniqueId: 0
    };
    Structure.init = function(){
        var _this = this;
        //update unique id per session
        _this.uniqueId = _this.getUniqueId();

        $('.list-group-item').click(function(){
            Structure.addElement($(this).text().toLowerCase());
        });
        this.container.on('click', '.form_builder', function(){
            console.log($(this))
        });
        $('#saveFormBuilder').click(function(){
            
            console.log(Structure.content)
            $.ajax({
                url: '/admin/saveFormBuilder',
                type: 'post',
                data: {ID: _this.uniqueId, NAME: 'some name', CONTENT: Structure.content},
                success: function(data){
                    console.log(data);
                },
                error: function(err){
                    console.log(err);
                }
            });
        });
    };
    Structure.selected = null;
    Structure.content = [];
    Structure.addElement = function(elementName){
        //need to find an alternative to avoid using eval method
        var element = eval('new ' + elementName + '()');
        var container = $('<div class="form_builder"></div>').append(element.getView());
        this.container.append(container);
        this.content.push(element.getConfig());
    }
    Structure.getUniqueId = function(){
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
    };
    Structure.init();
});