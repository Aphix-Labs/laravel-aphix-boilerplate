'use strict';

// dependencies

var $ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('metismenu');
var angular = require('angular');
var ngAnimate = require('angular-animate');
require('angular-toastr');
require('angular-ui-router');

// app
$('#menu').metisMenu();
angular

.module('adminApp', ['ui.router', 'toastr', ngAnimate])
.config(require('./routes.js'))
.service('UserService', require('./users/UserService'));
