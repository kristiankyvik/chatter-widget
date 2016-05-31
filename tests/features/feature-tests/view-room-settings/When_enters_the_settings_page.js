module.exports = function() {
  this.When(/^enters the settings page$/, function () {
    expect(browser.waitForExist(".menu.right .icon .setting")).toBe(true);
    browser.click(".menu.right .icon .setting");
  });
};
