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

    //third party components

    'nya.bootstrap.select',
    //our modules
    'suggestionsModule',
    'search',
    //our components
    'ui.elements.list',
    'ui.elements.element.creation',
    'ui.search.box'
  ])
.constant('serviceUrl', 'http://localhost:9000/')
.config(function($urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/search');
  });
