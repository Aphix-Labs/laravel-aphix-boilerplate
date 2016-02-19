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
require('angular-sanitize');
require('ui-select');

// app
$('#menu').metisMenu();

angular.module('adminApp', [
  'ui.router',
  'ngAnimate',
  'toastr',
  'oitozero.ngSweetAlert',
  'angular-loading-bar',
  'ui.select',
  'ngSanitize'
])
.config(require('./routes.js'))
.config(function(uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
})
.service('UserService', require('./users/UserService'))
.service('RoleService', require('./roles/RoleService'))
.service('PermissionService', require('./permissions/PermissionService'))
.service('Confirm', require('./helpers/Confirm'));
