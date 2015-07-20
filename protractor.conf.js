// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js



exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',

  // Spec patterns are relative to the location of this config.
  specs: [
    'e2e/modules/**/*.spec.js'
  ],

  multiCapabilities: [{
    'browserName': 'firefox'
  }, {
    'browserName': 'chrome'
  }],

  /*capabilities: {
   'browserName': 'chrome'
   },*/


  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9000',

  /*onPrepare: function() {

   browser.driver.get("http://localhost:9000" + "/#/access/login");
   Send credentials for login
   element(by.model('authCtrl.user.email')).sendKeys('');
   element(by.model('authCtrl.user.password')).sendKeys('');
   element(by.css('button[type="submit"]')).click();

   // Login takes some time, so wait until it's done.
   // For the test app's login, we know it's done when it redirects to
   // index.html.

   return browser.driver.wait(function() {
   return browser.driver.getCurrentUrl().then(function(url) {
   return /news/.test(url);
   });
   },10000);


   }*/

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }
};
