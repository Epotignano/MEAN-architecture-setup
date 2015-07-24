/**
 * Created by emiliano on 14/07/15.
 */

  var elementsListCtrl = ['suggestionsList', 'suggestionsService', function(elementsList, suggestionsService) {

    var ctrl = this;

    ctrl.list = elementsList;

    ctrl.newElement = {
      title: '',
      description: ''
    };

    ctrl.onCreationSuccess = function() {
      ctrl.newElement = {}
    };

  ctrl.elementsCreationFn = elementsService.creation;


  }];

angular.module('suggestionsModule', ['ui.router'])
  .controller("elementsListCtrl", elementsListCtrl);
