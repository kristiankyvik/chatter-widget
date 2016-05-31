module.exports = function() {
  this.When(/^admin clicks on new room$/, function () {
    browser.waitForExist(".newroom-btn");
    browser.click(".newroom-btn");
  });
};
