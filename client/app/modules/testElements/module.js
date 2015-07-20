/**
 * Created by emiliano on 14/07/15.
 */

angular.module('testElements')
  .config(function($stateProvider) {

    $stateProvider.state('elements',{

      abstract:true,
      url:'/elements',
      template: '<h1>Elements</h1><ui-view name="elements"></ui-view>'
    })

    $stateProvider.state('elements.list', {
      url:'/list',
      resolve: {
        elementsList : function(elementsService) {
          return elementsService.getList()
            .then(function(data) {
              return data;
            })
        }
      },
      views: {
        "elements" : {
          templateUrl: "app/modules/testElements/views/edition-list.html",
          controller: 'elementsListCtrl as ctrl'
        }
      }


    })

  });
