'use strict';

define(
  
  [
    'flight/component',
    'text!app/templates/stats.html',
    '../utils'
  ], 
  
  function (defineComponent, statsTmpl, utils) {

    return defineComponent(stats);

    function stats() {
      var template = utils.tmpl(statsTmpl);

      this.renderStats = function (e, data) {
        this.$node.html(template(data));
      },

      this.after('initialize', function () {
        this.on(document, 'dataStatsCounted', this.renderStats);
      });
    }
  }
);
