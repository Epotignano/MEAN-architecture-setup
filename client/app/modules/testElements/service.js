/**
 * Created by emiliano on 14/07/15.
 */

var elementsService = function($http, $q, serviceUrl) {

  var service = this;
  var _elementsUrl = serviceUrl + '/test';

  var _observers = [];

  service.getList = function() {
    var getListPromise = $q.defer();

    $http.get(_elementsUrl)
      .then(function(list) {
        getListPromise.resolve(list.data);
      })

    return getListPromise.promise;
  }

  service.creation = function(entity) {
    var createElemPromise = $q.defer();
    $http.post(_elementsUrl, entity)
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

  service.getList();

};




angular.module('testElements')
  .service('elementsService', elementsService);
