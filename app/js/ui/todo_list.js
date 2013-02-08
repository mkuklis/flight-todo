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

      this.render = function (e, data) {
        data.todos.forEach(function (each) {
          this.renderTodo(e, each);
        }, this);
      }

      this.renderTodo = function (e, data) {
        this.$node.append(template(data));
      },

      this.removeTodo = function (e, data) {
        var $todoEl = $(data.el).parents('li');
        this.trigger('uiRemoveRequested', { id: $todoEl.attr('id') });
        $todoEl.remove();
      },

      this.after('initialize', function () {
        this.on(document, 'dataTodoAdded', this.renderTodo);
        this.on(document, 'dataTodosLoaded', this.render);
        this.on('click', { 'destroySelector': this.removeTodo });

        this.trigger('uiLoadRequested');
      });
    }
  }
);
