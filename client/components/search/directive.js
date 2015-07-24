/**
 * Created by emiliano on 23/07/15.
 */

var searchBoxCtrl = ['suggestionsService', 'searchService', function(suggestionsService, searchService) {

  var search = this;

  search.options = [];

  search.getSuggestions = function() {
    var _query = {
      yahoo : search.yahoo,
      userSugg : search.userSuggestions,
      keyword: search.terms
    };

    console.log(search.terms);

    if(search.terms) {
      suggestionsService.getSuggestions(_query)
        .then(function(results) {
          search.options = results;
        })
      ;
    }

  };

  search.getResults = function() {
    searchService.search(search.terms)
      .then(function() {

      })
  };

  search.searchBySuggestion = function(suggestion) {
    search.terms = suggestion;
    search.getResults()
      .then(function(results) {



      })
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


