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
        toggleSelector: 'input.toggle',
        labelSelector: 'label',
        editSelector: 'input.edit'
      });

      this.renderAll = function (e, data) {
        this.$node.html('');
        data.todos.forEach(function (each) {
          this.render(e, each);
        }, this);

        this.on('blur', { 'editSelector': this.requestUpdate });
      }

      this.render = function (e, data) {
        this.$node.append(template(data));
      },

      this.edit = function (e, data) {
        var $todoEl = $(data.el).parents('li');

        $todoEl.addClass('editing');
        this.select('editSelector').focus();
      },

      this.requestUpdate = function (e) {
        var $inputEl = $(e.currentTarget);
        var $todoEl =  $inputEl.parents('li');
        var value = $inputEl.val().trim();

        if (value) {
          $todoEl.find('label').html(value);
          this.trigger('uiUpdateRequested', { 
            id: $todoEl.attr('id'), 
            label: value });
        } else {
          this.trigger('uiRemoveRequested', { id: $todoEl.attr('id') });
        }

        $todoEl.removeClass('editing');
      },

      this.requestRemove = function (e, data) {
        var $todoEl = $(data.el).parents('li');
        this.trigger('uiRemoveRequested', { id: $todoEl.attr('id') });
      },

      this.remove = function (e, data) {
        var $todoEl = this.$node.find("#" + data.id);
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
        this.on(document, 'dataTodoRemoved', this.remove);

        this.on('click', { 'destroySelector': this.requestRemove });
        this.on('click', { 'toggleSelector': this.toggle });
        this.on('dblclick', { 'labelSelector': this.edit });

        this.$node.on('blur', 'input', this.bind(this.requestUpdate));

        // these don't work
        // this.on(this.attr.editSelector, 'blur', this.requestUpdate);
        // this.on('dblclick', { 'labelSelector': this.edit });

        this.trigger('uiLoadRequested');
      });
    }
  }
);
