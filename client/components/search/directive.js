/**
 * Created by emiliano on 23/07/15.
 */

var searchBoxCtrl = [
  'suggestionsService',
  'searchService',
  '$document',
  '$element',
  function(suggestionsService, searchService, $document, $element) {

  var search = this;

  search.options = [];

  var elmScope = $element.isolateScope();

  search.getSuggestions = function() {
    var _query = {
      yahoo : search.yahoo,
      userSugg : search.userSuggestions,
      keyword: search.terms
    };

    console.log(search.terms);

    if(search.terms && !search.searchingResults) {
      search.searchingSugg = true;
      search.searchingSuggPromise =
      suggestionsService.getSuggestions(_query)
        .then(function(results) {
          if(!search.searchingResults) {
            search.options = results;
          }
          search.searchingSugg = false
          ;
        })
      ;
    } else {
      search.options = [];
    }

  };

  $document.bind('click', function(event) {
    if( event.target.className.match('search-box')) {
      search.getSuggestions();
    }
  });

    elmScope.$watch('search.selectedSuggestion', function(value) {
      console.log(value);
      if(value) {
        search.terms = value;
        search.getResults(value);
      }
    });


  search.getResults = function(terms) {
    search.searchingResults = true;
    if(terms) {
      searchService.search(terms)
        .then(function(response) {
          search.response = response.data;
          search.searchingResults = false;
        })
    }
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
      suggestions.selectedSuggestion = suggestion.key;
    };


    $document.bind('click', function(event) {
      if( !event.target.className.match('search-box') && suggestions.list && suggestions.list.length) {
        suggestions.list = [];
        suggestions.hide = true;
        elmScope.$apply();
      }
    });

    $document.bind('click', function(event) {
      console.log(event);
      if( !event.target.className.match('search-box')) {
        suggestions.hide = false;
        elmScope.$apply();
      }
    });

}];


var searchResultsCtrl = function() {
  var results = this;
};


var searchResultCardCtrl = function() {
  var card = this;
};

angular.module('ui.search.box', ['ngSanitize'])
  .controller('searchBoxCtrl', searchBoxCtrl)
  .controller('suggestionsListCtrl', suggestionsListCtrl)
  .controller('searchResultsCtrl', searchResultsCtrl)
  .controller('searchResultCardCtrl', searchResultCardCtrl)
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

  .directive('suggestionsList', ['searchService', function(searchService){
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
  }])

.directive('searchResults', ['searchService', function(searchService){
  // Runs during compile
  return {
    scope: {
      list : '='
    },
    controller: 'searchResultsCtrl as results',
    restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'components/search/searchResults.html',
    bindToController : true
  };
}])

.directive('searchResultCard', ['searchService', function(searchService){
  // Runs during compile
  return {
    scope: {
      element : '='
    },
    controller: 'searchResultCardCtrl as card',
    restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'components/search/resultCard.html',
    bindToController : true
  };
}]);


;


