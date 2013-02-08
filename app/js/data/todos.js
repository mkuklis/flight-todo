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

      this.toggleCompleted = function (e, data) {
        var todo = dataStore.get(data.id);

        todo.completed = !todo.completed;
        dataStore.set(todo.id, todo);
        this.trigger('dataTodoToggled', todo);
      },

      this.toggleAllCompleted = function (e, data) {
        var todos = dataStore.getAllValues();
        
        todos.forEach(function (each) {
          each.completed = data.completed;
          dataStore.set(each.id, each);
        });

         this.trigger('dataTodoToggledAll', { todos: todos });
      },

      this.clearCompleted = function () {
         var todos = dataStore.getAllValues();
         var filtered = todos.filter(function (each) {
           if (each.completed) {
            dataStore.remove(each.id);
            return false;
           }

           return true;
         });
        
        this.trigger('dataClearedCompleted', { todos: filtered });
      },

      this.after('initialize', function () {
        this.on(document, 'uiAddRequested', this.add);
        this.on(document, 'uiRemoveRequested', this.remove);
        this.on(document, 'uiLoadRequested', this.load);
        this.on(document, 'uiToggleRequested', this.toggleCompleted);
        this.on(document, 'uiToggleAllRequested', this.toggleAllCompleted);
        this.on(document, 'uiClearRequested', this.clearCompleted);
      });
    }
  }
);
