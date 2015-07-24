/**
 * Created by emiliano on 23/07/15.
 */

var searchBoxCtrl = ['suggestionsService', '$element','$window', function(suggestionsService, $element, $window) {

  var search = this;

  search.options = [];
  var elementScope = $element.isolateScope();

  elementScope.$watch('search.terms', function(newVal, oldVal) {

    if(newVal && newVal.length) {
      search.getSuggestions(newVal, function(results) {
        search.options = results;
      })
    }

  });

  search.getSuggestions = function(keyword, cb) {
    var _query = {
      yahoo : search.yahoo,
      userSugg : search.userSuggestions,
      keyword: keyword
    };


    suggestionsService.getSuggestions(_query, cb)
      .then(function(results) {
        console.log(results);
        cb(results);
      })
    ;
  }

}];


angular.module('ui.search.box', ['nya.bootstrap.select'])
  .controller('searchBoxCtrl', searchBoxCtrl)
   .directive('searchBox', ['searchService', function(searchService){
     // Runs during compile
     return {
       scope: {
         terms : '=',
         yahoo: '=',
         userSuggestions: '='
       }, // {} = isolate, true = child, false/undefined = no change
       controller: "searchBoxCtrl as search",
       restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
       templateUrl: 'components/search/template.html',
       bindToController : true
     };
   }]);


