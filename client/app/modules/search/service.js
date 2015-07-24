/**
 * Created by emiliano on 23/07/15.
 */

var searchService = function($http,$q) {

  var searchBaseUrl = '/api/search';

  var service = this;

  service.search = function(params) {

    var searchPromise = $q.defer();

    $http.post(searchBaseUrl, params)
      .then(function(response) {
        searchPromise.resolve(response);
      });

    return searchPromise.promise;

  }
};


angular.module('search')
  .service('searchService', searchService);
