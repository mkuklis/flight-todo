'use strict';

define(

  function() {

    return withFilters;

    function withFilters() {
      this.defaultAttrs({
        filterSelector: '#filters a'
      });

      this.chooseFilter = function (e, data) {
        var filter = data.el.hash.slice(2);

        this.select('filterSelector').removeClass('selected');
        $(data.el).addClass('selected');
        this.trigger("uiFilterRequested", { filter: filter }); 
      }

      this.after("initialize", function() {
        this.on('click', {
          filterSelector: this.chooseFilter
        });
      });
    }
  }
);
