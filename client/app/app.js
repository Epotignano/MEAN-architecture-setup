'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('musicFirstApplicationCloud', [

    //third party libraries
    'ui.router',
    'formly',
    'formlyBootstrap',

    //our modules
    'testElements',
    //our components
    'ui.elements.list',
    'ui.elements.element.creation'
  ])
.constant('serviceUrl', 'http://localhost:9000/')
.config(function($urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
  });
