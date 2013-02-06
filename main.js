require.config({
  paths: {
    jquery: 'components/jquery/jquery',
    es5shim: 'components/es5-shim/es5-shim',
    es5sham: 'components/es5-shim/es5-sham',
    text: 'components/requirejs/plugins/text',
  },
  map: {
    '*': {
      'flight': 'components/flight/lib/index',
      'flight/component': 'components/flight/lib/component',
    }
  },
  shim: {
    'components/flight/lib/index': {
      deps: ['jquery', 'es5shim', 'es5sham']
    }
  }
});

require(['flight', 'app/js/app'], function (flight, App) {
  var mixins = [flight.advice.withAdvice, flight.logger];

  flight.compose.mixin(flight.registry, mixins);
  App.initialize();
});
