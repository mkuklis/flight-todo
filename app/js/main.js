require.config({
  baseUrl: './',
  paths: {
    jquery: 'components/jquery/jquery',
    es5shim: 'components/es5-shim/es5-shim',
    es5sham: 'components/es5-shim/es5-sham',
    text: 'components/requirejs/plugins/text',
    store: 'components/store/store.min'
  },
  map: {
    '*': {
      'flight/component': 'components/flight/lib/component',
    }
  },
  shim: {
    'components/flight/lib/index': {
      deps: ['jquery', 'es5shim', 'es5sham']
    },
    'app/js/app': {
      deps: ['components/flight/lib/index', 'store']
    }
  }
});

require(['app/js/app'], function (App) {
  //var mixins = [flight.advice.withAdvice, flight.logger];
  //flight.compose.mixin(flight.registry, mixins);
  App.initialize();
});
