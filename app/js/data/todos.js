'use strict';

define(
  
  [
    'flight/component',
    '../store'
  ], 
  
  function (defineComponent, dataStore) {

    return defineComponent(todos);

    function todos() {

      this.add = function (e, data) {
        var todo = dataStore.save({
          title: data.title,
          completed: false
        });

        this.trigger('dataTodoAdded', todo);
      },

      this.remove = function (e, data) {
        var todo = dataStore.destroy(data.id);
        this.trigger('dataTodoRemoved', todo);
      },

      this.load = function (e, data) {
        var filter = localStorage.getItem('filter');
        var todos = this.find(filter);

        this.trigger('dataTodosLoaded', { todos: todos });
      },

      this.toggleCompleted = function (e, data) {
        var todo = dataStore.get(data.id);

        todo.completed = !todo.completed;
        dataStore.save(todo);

        var filter = localStorage.getItem('filter');
        var eventType = (filter) ? 'dataTodoRemoved' : 'dataTodoToggled';

        this.trigger(eventType, todo);
      },

      this.toggleAllCompleted = function (e, data) {
        dataStore.updateAll({ completed: data.completed });
        var filter = localStorage.getItem('filter');
        this.trigger('dataTodoToggledAll', { todos: this.find(filter) });
      },

      this.filter = function (e, data) {
        var todos;

        todos = this.find(data.filter);
        localStorage.setItem('filter', data.filter);

        this.trigger('dataTodosFiltered', { todos: todos });
      },

      this.find = function (filter) {
        var todos;

        if (filter) {
          todos = dataStore.find(function (each) {
            return (typeof each[filter] != "undefined") ? each.completed : !each.completed;
          });
        }
        else {
          todos = dataStore.all();
        }

        return todos;
      },

      this.clearCompleted = function () {
        var todos;

        dataStore.destroyAll({ completed: true });
        todos = dataStore.all();
        this.trigger('dataClearedCompleted', { todos: todos });
      },

      this.after('initialize', function () {
        this.on(document, 'uiAddRequested', this.add);
        this.on(document, 'uiRemoveRequested', this.remove);
        this.on(document, 'uiLoadRequested', this.load);
        this.on(document, 'uiToggleRequested', this.toggleCompleted);
        this.on(document, 'uiToggleAllRequested', this.toggleAllCompleted);
        this.on(document, 'uiClearRequested', this.clearCompleted);
        this.on(document, 'uiFilterRequested', this.filter);
      });
    }
  }
);
