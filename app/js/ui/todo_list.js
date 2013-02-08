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
        destroySelector: 'button.destroy',
        toggleSelector: 'input.toggle'
      });

      this.renderAll = function (e, data) {
        this.$node.html('');

        data.todos.forEach(function (each) {
          this.render(e, each);
        }, this);
      }

      this.render = function (e, data) {
        this.$node.append(template(data));
      },

      this.remove = function (e, data) {
        var $todoEl = $(data.el).parents('li');

        this.trigger('uiRemoveRequested', { id: $todoEl.attr('id') });
        $todoEl.remove();
      },

      this.toggle = function (e, data) {
        var $todoEl = $(data.el).parents('li');
        
        $todoEl.toggleClass('completed');
        this.trigger('uiToggleRequested', { id: $todoEl.attr('id') });
      },

      this.after('initialize', function () {
        this.on(document, 'dataTodoAdded', this.render);
        this.on(document, 'dataTodosLoaded', this.renderAll);
        this.on(document, 'dataTodosFiltered', this.renderAll);
        this.on(document, 'dataClearedCompleted', this.renderAll);
        this.on(document, 'dataTodoToggledAll', this.renderAll);


        this.on('click', { 'destroySelector': this.remove });
        this.on('click', { 'toggleSelector': this.toggle });

        this.trigger('uiLoadRequested');
      });
    }
  }
);
