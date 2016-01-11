'use strict';

// dependencies

window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('metismenu');
var angular = require('angular');

// app
$("#menu").metisMenu();

angular
  .module('angularApp', [])
  .controller('MainCtrl', require('./controllers/mainctrl'));
