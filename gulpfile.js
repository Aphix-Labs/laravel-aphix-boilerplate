var elixir = require('laravel-elixir');

elixir.config.js.browserify.transformers.push({
  name: 'browserify-ngannotate',
  options: {}
});

elixir(function(mix) {

  // common
  mix.copy('node_modules/font-awesome/fonts', 'public/build/fonts/');

  // public
  mix.sass([
    'public/public.scss'
  ], 'resources/assets/css/public/public.css');

  mix.styles([
    'public/public.css'
  ], 'public/css/public.css');

  mix.browserify('public/index.js', 'public/js/public.js');

  // admin
  mix.sass([
    'admin/admin.scss'
  ], 'resources/assets/css/admin/admin.css');

  mix.styles([
    '../../../node_modules/metismenu/dist/metisMenu.css',
    '../../../node_modules/angular-toastr/dist/angular-toastr.css',
    '../../../node_modules/angular-loading-bar/build/loading-bar.css',
    '../../../node_modules/ui-select/dist/select.css',
    'admin/admin.css'
  ], 'public/css/admin.css');

  mix.browserify('admin/index.js', 'public/js/admin.js');

  mix.version([
    'css/public.css',
    'js/public.js',
    'css/admin.css',
    'js/admin.js'
  ]);
});
