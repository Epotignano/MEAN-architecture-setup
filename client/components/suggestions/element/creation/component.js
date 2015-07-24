/**
 * Created by emiliano on 14/07/15.
 */


  var elementsCreationCtrl = function(elementFormService) {

    var ctrl = this;
    ctrl.fields = elementFormService.getFields();

    ctrl.onSubmit = function() {
      ctrl.submit(ctrl.entity).then(function() {
        ctrl.onSuccess();
      })
    }

  };


  var elementFormService = function() {
    var service = this;

    //Could we put more configuration here, for keep it simple, I will put the form fields only

    var _fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions : {
          type:'text',
          label : 'Title',
          placeholder: 'eg. An amazing title'
        }

      },

      {
        key : "description",
        type: "textarea",
        templateOptions : {
          label:'Description',
          type: 'text',
          placeholder: 'Description here'
        }

      },

    ];

    service.getFields = function() {
      return _fields;
    }
  };


angular.module('ui.elements.element.creation', ['formly', 'formlyBootstrap'])
  .service('elementFormService', elementFormService)
  .controller('elementsCreationCtrl', elementsCreationCtrl)
  .directive('elementsCreation', function(){
    // Runs during compile
    return {
      scope: {
        entity: '=',
        onSuccess : '=',
        submit : '='
      }, // {} = isolate, true = child, false/undefined = no change
      controller: 'elementsCreationCtrl as elementCreation',
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'components/suggestions/element/creation/template.html',
      bindToController : true
    };
  });
