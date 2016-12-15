module.exports = function () {
  this.When(/^I click on the settings button$/, function () {
    browser.click(".right.menu .icon.item");
  });
};
