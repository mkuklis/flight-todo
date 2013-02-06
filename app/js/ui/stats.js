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
        var toggle = data.all > 0;

        this.$node.html(template(data));
        this.$node.toggle(toggle);
      },

      this.after('initialize', function () {
        this.on(document, 'dataStatsCounted', this.renderStats);
        this.$node.hide();
      });
    }
  }
);
