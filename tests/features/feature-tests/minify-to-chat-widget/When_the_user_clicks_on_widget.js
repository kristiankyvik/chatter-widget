module.exports = function() {
  this.When(/^the user clicks on widget$/, function () {
    browser.click(".chatter-open");
  });
};
