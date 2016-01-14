'use strict';

// dependencies

var $ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('metismenu');
var angular = require('angular');
require('angular-ui-router');

// app
$('#menu').metisMenu();
angular

.module('adminApp', ['ui.router'])
.config(require('./routes.js'))
.service('UserService', require('./users/UserService'));
