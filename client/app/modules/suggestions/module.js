/**
 * Created by emiliano on 14/07/15.
 */

angular.module('suggestionsModule')
  .config(function($stateProvider) {

    $stateProvider.state('suggestions',{

      abstract:true,
      url:'/suggestions',
      templateUrl: '<h1>Custom suggestions</h1><ui-view ></ui-view>'
    })

    $stateProvider.state('suggestions.list', {
      url:'/creation_list',
      resolve: {
        suggestionsList : function(suggestionsService) {
          return suggestionsService.getList()
            .then(function(data) {
              return data;
            })
        }
      },
      views: {
        "elements" : {
          templateUrl: "app/modules/suggestions/views/creation-list.html",
          controller: 'elementsListCtrl as ctrl'
        }
      }


    })

  });
