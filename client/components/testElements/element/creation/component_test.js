/**
 * Created by emiliano on 18/07/15.
 */

//test with karma

describe('Elements creation component', function() {

  var _scope, _element;

  beforeEach(module('ui.elements.element.creation'));
  beforeEach(module('ui.templates'));
  beforeEach(module('ngMockE2E'));

  beforeEach(inject(function(_$httpBackend_) {
    _$httpBackend_.whenGET(/component/).respond(200);
  }));

  beforeEach(inject(function($rootScope, $compile) {

    _scope = $rootScope.$new();
    _element = '<elements-creation on-success="" entity="" submit=""></elements-creation>';

    _element = $compile(_element)(_scope);

    _scope.$digest();

  }));

  it('should submit the data', function() {
    console.log(_element);
  })

});
