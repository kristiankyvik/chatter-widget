module.exports = function() {
  this.When(/^the user minifies the window$/, function () {
    expect(browser.waitForExist(".menu .right .icon .minus")).toBe(true);
    browser.click(".menu .right .icon .minus");
  });
};
