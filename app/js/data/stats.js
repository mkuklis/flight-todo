'use strict';

define(
  
  [
    'flight/component',
    '../data_store'
  ], 

  function (defineComponent, dataStore) {

    return defineComponent(stats);

    function stats() {
      this.recount = function (e, todoData) {
        this.trigger('dataStatsCounted', this.countStats());
      },

      this.countStats = function () {
        return { 
          remaining: 2,
          completed: 1 
        };
      },

      this.after('initialize', function () {
        this.on(document, 'dataTodoAdded', this.recount);
      });
    }
  }
);
