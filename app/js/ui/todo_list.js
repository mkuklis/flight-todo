'use strict';

define(
  
  [
    'flight/component',
    'text!app/templates/todo.html',
    '../utils'
  ], 
  
  function (defineComponent, todoTmpl, utils) {

    return defineComponent(todoList);

    function todoList() {
      var template = utils.tmpl(todoTmpl);

      this.defaultAttrs({
        destroySelector: 'button.destroy'
      });

      this.renderTodo = function (e, data) {
        this.$node.append(template(data.todoData));
      },

      this.removeTodo = function () {
        // TODO
      },

      this.after('initialize', function () {
        this.on(document, 'dataTodoAdded', this.renderTodo);

        this.on('click', {
          'destroySelector': this.removeTodo
        });
      });
    }
  }
);
