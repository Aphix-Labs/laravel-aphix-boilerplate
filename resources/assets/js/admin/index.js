'use strict';

// dependencies
var $ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('metismenu');
var angular = require('angular');
require('angular-animate');
require('angular-toastr');
require('angular-ui-router');
require('sweetalert');
require('angular-sweetalert');
require('angular-loading-bar');

// app
$('#menu').metisMenu();

angular.module('adminApp', [
  'ui.router',
  'ngAnimate',
  'toastr',
  'oitozero.ngSweetAlert',
  'angular-loading-bar'
])
.config(require('./routes.js'))
.service('UserService', require('./users/UserService'))
.service('RoleService', require('./roles/RoleService'))
.service('Confirm', require('./helpers/Confirm'));
