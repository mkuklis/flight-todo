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

			var ENTER_KEY = 13;
			var template = utils.tmpl(todoTmpl);

			this.defaultAttrs({
				destroySelector: 'button.destroy',
				toggleSelector: 'input.toggle',
				labelSelector: 'label',
				editSelector: '.edit'
			});

			this.renderAll = function (e, data) {
				this.$node.html('');
				data.todos.forEach(function (each) {
					this.render(e, { todo: each });
				}, this);
			}

			this.render = function (e, data) {
				if (e.type == "dataTodoAdded"
				    && data.filter == 'completed') {
					return;
				}

				this.$node.append(template(data.todo));
			}

			this.edit = function (e, data) {
				var $todoEl = $(data.el).parents('li');

				$todoEl.addClass('editing');
				this.select('editSelector').focus();
			}

			this.requestUpdate = function (e, data) {
				var $inputEl = $(data.el);
				var $todoEl =  $inputEl.parents('li');
				var value = $inputEl.val().trim();
				var id =  $todoEl.attr('id');

				if (!$todoEl.hasClass('editing')) {
					return;
				}

				!$todoEl.removeClass('editing');

				if (value) {
					$todoEl.find('label').html(value);
					this.trigger('uiUpdateRequested',  { id: id, title: value });
				} else {
					this.trigger('uiRemoveRequested', { id: id });
				}
			},

			this.requestUpdateOnEnter = function (e, data) {
				if (e.which === ENTER_KEY) {
					this.requestUpdate(e, data);
				}
			},

			this.requestRemove = function (e, data) {

				var id = $(data.el).attr('id').split('_')[1];
				this.trigger('uiRemoveRequested', { id: id });
			}

			this.remove = function (e, data) {
				var $todoEl = this.$node.find('#' + data.id);
				$todoEl.remove();
			}

			this.toggle = function (e, data) {
				var $todoEl = $(data.el).parents('li');

				$todoEl.toggleClass('completed');
				this.trigger('uiToggleRequested', { id: $todoEl.attr('id') });
			}

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
        this.on('keydown', { 'editSelector': this.requestUpdateOnEnter });
        this.on('focusout', { 'editSelector': this.requestUpdate });

				this.trigger('uiLoadRequested');
			});
		}
	}
);
