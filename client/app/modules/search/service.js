/**
 * Created by emiliano on 23/07/15.
 */


//TODO Refactor to a service
var qs = function(obj, prefix){
  var str = [];
  for (var p in obj) {
    var k = prefix ? prefix + "[" + p + "]" : p,
      v = obj[k];
    str.push(angular.isObject(v) ? qs(v, k) : (k) + "=" + encodeURIComponent(v));
  }


  console.log(str.join("&"));

  return str.join("&");
};


var searchService = function($http,$q,  serviceUrl) {

  var searchBaseUrl = serviceUrl + 'api/search';

  var service = this;

  service.search = function(params) {

    var searchPromise = $q.defer();

    $http.get(searchBaseUrl + qs(params))
      .then(function(response) {
        searchPromise.resolve(response);
      });

    return searchPromise.promise;

  }
};


angular.module('search')
  .service('searchService', searchService);
