var elixir = require('laravel-elixir');

elixir(function(mix) {
  mix.sass('app.scss');

  mix.scripts([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
  ]);

  mix.version(['css/app.css', 'js/all.js']);
});
