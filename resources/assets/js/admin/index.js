'use strict';

// dependencies

window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('metismenu');
var angular = require('angular');
require('angular-ui-router');

// app
$("#menu").metisMenu();

angular
.module('adminApp', ['ui.router'])
.config(require('./routes.js'))
.service('UserService', require('./services/UserService'))
.controller('UsersController', require('./controllers/UsersController'));
