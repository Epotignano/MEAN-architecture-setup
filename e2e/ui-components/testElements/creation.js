/**
 * Created by emiliano on 15/07/15.
 */
var ElementCreationComponent = (function() {

  var FormInteraction = this;

  var _formElements = {
    title : element(by.id("formly_1_input_title_0")),
    description : element(by.id("formly_1_textarea_description_1"))
  };

  FormInteraction.fillTitle = function(title) {
    _formElements.title.sendKeys(title);
  };

  FormInteraction.fillDescription= function(description) {
    _formElements.description.sendKeys(description);
  };

  FormInteraction.submit = function(finishCallback) {
    element(by.id("submit_form_button")).click().then(function() {
      finishCallback()
    })
  };

  FormInteraction.createElement = function(data, finishCallback) {
    this.fillTitle(data.title);
    this.fillDescription(data.description);
    this.submit(finishCallback);
  };

  return FormInteraction;

})();

module.exports = ElementCreationComponent;
