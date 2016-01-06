var elixir = require('laravel-elixir');

elixir(function(mix) {

  // common
  mix.copy(
    'node_modules/font-awesome/fonts',
    'public/build/fonts/'
  )

  // front-end
  mix.sass('frontend.scss');

  mix.browserify('frontend.js');

  mix.version(['css/frontend.css', 'js/frontend.js']);

  //back-end
});
