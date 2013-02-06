'use strict';

define(

  [
    'flight/component'
  ], 
  
  function (defineComponent) {

    return defineComponent(newTodo);

    function newTodo() {

      var ENTER_KEY = 13;

      this.after('initialize', function () {
        this.on('keydown', this.createOnEnter);
      });

      this.createOnEnter = function (e) {
        if (e.which !== ENTER_KEY || !this.$node.val().trim()) {
          return;
        }

        this.trigger('uiAddRequested', {
          title: this.$node.val().trim(),
          //order: app.Todos.nextOrder(),
          completed: false
        });

        this.$node.val('');
      }
    }
  }
);
