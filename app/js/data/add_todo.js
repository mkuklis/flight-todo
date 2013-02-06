'use strict';

define(
  
  [
    'flight/component',
    '../data_store'
  ], 
  
  function (defineComponent, dataStore) {

    return defineComponent(addTodo);

    function addTodo() {
      this.add = function (e, todoData) {
        dataStore.push(todoData);
        this.trigger('dataTodoAdded', {todoData: todoData});
      },

      this.after('initialize', function () {
        this.on(document, 'uiAddRequested', this.add);
      });
    }
  }
);
