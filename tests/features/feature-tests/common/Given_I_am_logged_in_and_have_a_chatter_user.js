module.exports = function() {
  this.Given(/^I am logged in and have a chatter user$/, function () {
    server.call("createTestUser");
    browser.url('http://localhost:3000');
    browser.waitForExist("#login-sign-in-link", 2000);
    browser.click("#login-sign-in-link");
    browser.setValue("input[id='login-email'", "kyvik_bcn@yahoo.es");
    browser.setValue("input[id='login-password'", "banana");
    browser.click("#login-buttons-password");
  });
};
