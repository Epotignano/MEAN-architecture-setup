/**
 * Created by emiliano on 15/07/15.
 */

var testElementsListCtrl = ['$element','elementsService', function($element, elementsService) {
  var ctrl = this;

  var listScope = $element.scope();

  elementsService.registerObserver(listScope);

  listScope.$on('elementCreated', function(evt, data) {
    ctrl.elements.push(data);
  })

}];


angular.module('ui.elements.list', [])
.controller('testElementsListCtrl', testElementsListCtrl)
.directive('testElementsList',function(){
  return {
    scope: {
      elements : '='
    }, // {} = isolate, true = child, false/undefined = no change
    controller: 'testElementsListCtrl as list',
    restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'components/testElements/list/template.html',
    bindToController : true
  };
});
