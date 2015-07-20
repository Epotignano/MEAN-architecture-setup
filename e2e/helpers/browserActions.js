/**
 * Created by emiliano on 27/04/15.
 */
var browserActions = (function() {

  var actions = this;

  actions.pressEnter = function() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  };

  actions.checkIfElementIsDisplayed = function(selector, byProperty) {
    var query;

    if(byProperty) {
      query = element(by[byProperty](selector)).isDisplayed()
    } else {
      query = element(by.css(selector)).isDisplayed();

    }

    return query.isDisplayed();
  };

  actions.goBack = function(callback) {
    browser.navigate().back().then(function() {
      callback();
    })
  };

  actions.waitForUrlChange = function(urlPattern, callback) {
    var patternFind = false;
    return browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        patternFind = new RegExp(urlPattern).test(url);
        return patternFind
      });
    },10000).then(function() {
      callback(patternFind);
    })

  };

  return actions;

})();

module.exports = browserActions;
