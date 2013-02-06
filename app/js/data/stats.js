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
        var stats = { 
          remaining: 0, 
          completed: 0, 
          all: dataStore.length 
        };

        return dataStore.reduce(function (memo, item) {
          memo.remaining += (!item.completed) ? 1 : 0;
          memo.completed += (item.completed) ? 1 : 0;
          return memo;
        }, stats);
      },

      this.after('initialize', function () {
        this.on(document, 'dataTodoAdded', this.recount);
      });
    }
  }
);
