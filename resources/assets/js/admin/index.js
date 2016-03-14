'use strict';

// dependencies
var $ = window.jQuery = require('jquery');
var angular = require('angular');
require('bootstrap-sass');
require('metismenu');
require('angular-animate');
require('angular-toastr');
require('angular-ui-router');
require('sweetalert');
require('angular-sweetalert');
require('angular-loading-bar');
require('angular-sanitize');
require('ui-select');
require('angular-ui-bootstrap');

// app
$('#menu').metisMenu();

angular.module('adminApp', [
  'ui.router',
  'ngAnimate',
  'toastr',
  'oitozero.ngSweetAlert',
  'angular-loading-bar',
  'ui.select',
  'ngSanitize',
  'ui.bootstrap'
])
.config(require('./routes.js'))
.config(function(uiSelectConfig, uibPaginationConfig) {
  uiSelectConfig.theme = 'bootstrap';
  uibPaginationConfig.previousText = 'Previo';
  uibPaginationConfig.nextText = 'Siguiente';
})
.service('ApiService', require('./ApiService'))
.service('UserService', require('./users/UserService'))
.service('RoleService', require('./roles/RoleService'))
.service('PermissionService', require('./permissions/PermissionService'))
.service('DocumentService', require('./documents/DocumentService'))
.service('Confirm', require('./helpers/Confirm'))
// catch errors from ui-router resolve
.run(function($rootScope, $log) {
  $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error) {
      $log.error('error', error);
    });
});
