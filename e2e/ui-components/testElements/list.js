/**
 * Created by emiliano on 15/07/15.
 */

var ElementsListComponent = (function(){

  //TODO Check if component is displayed

  var list = this;

  list.getListScope = function() {
    return element(by.id("testElementsList")).evaluate("list");
  };

  list.getListScopeVar = function(varToFind) {
    var _find = "list." + varToFind;
    return element(by.id("testElementsList")).evaluate(_find);
  }

  list.getListElements = function() {
    return element(by.repeater("element in list.elements"));
  };


  list.searchElement = function(key, value, callback) {
    var _elem;
    this.getListScopeVar('elements').then(function(elements) {
      elements.some(function(element) {
        if(element[key] == value) {
          _elem = element[key];
          return
        }
      });

      callback({element: _elem, found: !!_elem})

    })

  };

  return list;

})();

module.exports = ElementsListComponent;
