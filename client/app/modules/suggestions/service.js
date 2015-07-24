/**
 * Created by emiliano on 14/07/15.
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


var suggestionsService = function($http, $q, serviceUrl) {

  var service = this;
  var _suggestionsUrl = serviceUrl + 'api/suggestionss';

  var _observers = [];

  service.getList = function() {
    var getListPromise = $q.defer();

    $http.get(_suggestionsUrl)
      .then(function(list) {
        getListPromise.resolve(list.data);
      })

    return getListPromise.promise;
  }

  service.creation = function(entity) {
    var createElemPromise = $q.defer();
    $http.post(_suggestionsUrl, entity)
      .then(function(response) {
        if(response.status == 200) {
            entity._id = response.data._id;
            service.notifyObservers('elementCreated', entity);
          } else {
          throw Error('An error has happen when trying to save the entity')
        }
        createElemPromise.resolve(response);
      });

    return createElemPromise.promise;
  };

  service.registerObserver = function(observer) {
    _observers.push(observer);
  };

  service.notifyObservers = function(message, data) {
    if (_observers.length) {
      _observers.forEach(function(observerScope) {
        observerScope.$emit(message, data)
      })
    }
  };

  service.getSuggestions = function(query) {
    var getSuggPromise = $q.defer();

    $http.get(_suggestionsUrl+ '?' + qs(query))
      .then(function(results) {
        getSuggPromise.resolve(results.data)
      });

    return getSuggPromise.promise;
  };

};




angular.module('suggestionsModule')
  .service('suggestionsService', suggestionsService);
