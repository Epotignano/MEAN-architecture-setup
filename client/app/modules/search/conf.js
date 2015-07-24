/**
 * Created by emiliano on 23/07/15.
 */
angular.module('search', ['ui.router'])
  .config(function($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'app/modules/search/views/search.html',
        controller: 'searchCtrl as ctrl'
      })
  });
