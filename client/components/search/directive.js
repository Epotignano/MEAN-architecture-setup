/**
 * Created by emiliano on 23/07/15.
 */

var searchBoxCtrl = [
  'suggestionsService',
  'searchService',
  '$document',
  function(suggestionsService, searchService, $document) {

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

  $document.bind('click', function(event) {
    if( event.target.className.match('search-box')) {
      search.getSuggestions();
    }
  })

  search.getResults = function() {
    searchService.search(search.terms)
      .then(function() {

      })
  };

}];


var suggestionsListCtrl = [
  'suggestionsService',
  'searchService',
  '$element',
  '$document',
  function(suggestionsService, searchService, $element, $document) {

    var suggestions = this;
    suggestions.hide = false;

    var elmScope = $element.scope();

    suggestions.searchBySuggestion = function(suggestion) {
      console.log(suggestion);

      suggestions.selectedSuggestion = suggestion.key;
    };

    console.log($element);

    $document.bind('click', function(event) {
      if( (!event.target.className.match('results-list') || !event.target.className.match('search-box') ) && suggestions.list && suggestions.list.length) {
        suggestions.list = [];
        suggestions.hide = true;
        elmScope.$apply();
      }
    })

    $document.bind('click', function(event) {
      if( !event.target.className.match('search-box')) {
        suggestions.hide = false;
        elmScope.$apply();
      }
    })





}];


angular.module('ui.search.box', [])
  .controller('searchBoxCtrl', searchBoxCtrl)
  .controller('suggestionsListCtrl', suggestionsListCtrl)
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
   }])

  .directive('suggestionsList', ['searchService', function(){
    // Runs during compile
    return {
      scope: {
        list: '=',
        selectedSuggestion: '='
      }, // {} = isolate, true = child, false/undefined = no change
      controller: "suggestionsListCtrl as suggestions",
      restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'components/search/suggestions-list.html',
      bindToController : true
    };
  }]);


