var elixir = require('laravel-elixir');

elixir(function(mix) {

  // common
  mix.copy(
    'node_modules/font-awesome/fonts',
    'public/build/fonts/'
  );

  // public
  mix.sass('public.scss');

  mix.browserify('public/index.js', 'public/js/public.js');

  mix.version(['css/public.css', 'js/public.js']);

  // admin
});
