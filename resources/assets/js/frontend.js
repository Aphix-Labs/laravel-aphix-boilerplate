'use strict';

// dependencies

window.$ = window.jQuery = require('jquery')
require('bootstrap-sass');
var angular = require('angular');

// app

angular
  .module('angularApp', [])
  .controller('MainCtrl', require('./controllers/mainctrl'))
