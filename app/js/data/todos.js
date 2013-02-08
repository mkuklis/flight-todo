'use strict';

define(
  
  [
    'flight/component',
    'store'
  ], 
  
  function (defineComponent, dataStore) {

    return defineComponent(todos);

    function todos() {

      this.add = function (e, data) {
        var todo = {
          id: String(Date.now()),
          title: data.title,
          completed: false
        };

        dataStore.set(todo.id, todo);
        this.trigger('dataTodoAdded', todo);
      },

      this.remove = function (e, data) {
        var todo = dataStore.get(data.id);
        dataStore.remove(data.id);
        this.trigger('dataTodoRemoved', todo);
      },

      this.load = function () {
        var todos = dataStore.getAllValues();
        this.trigger('dataTodosLoaded', { todos: todos });
      },

      this.after('initialize', function () {
        this.on(document, 'uiAddRequested', this.add);
        this.on(document, 'uiRemoveRequested', this.remove);
        this.on(document, 'uiLoadRequested', this.load);
      });
    }
  }
);
