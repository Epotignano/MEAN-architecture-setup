/**
 * Created by emiliano on 15/07/15.
 */

//Require the view components

var ElementsListComponent = require('../../components/testElements/list.js');
var ElementCreationComponent = require('../../components/testElements/creation.js');

//Test

describe("Test Elements View", function() {

  browser.driver.get("http://localhost:9000" + "/#/elements/list");

  it("Should create a new element and show it in the list", function(done) {

    var testData = {
      title: "Mira Matii",
      description: "Me creo un robot"
    };

    browser.wait(function() {
      return element(by.id("formly_1_input_title_0"))
    }).then(function() {
      ElementCreationComponent.createElement(testData, function() {
        console.log('Here');
        ElementsListComponent.searchElement('title', testData.title, function (result) {
          expect(result.found).toBe(true);
          done();
        })
      })
    });

  })

});
