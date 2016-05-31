module.exports = function() {
  this.When(/^the user archives a room$/, function () {
    expect(browser.waitForExist(".menu.right .icon .setting")).toBe(true);
    browser.click(".menu.right .icon .setting");
    expect(browser.waitForExist(".settings")).toBe(true);
    browser.click(".toggle.checkbox");
    browser.click(".menu .left .close");
    browser.click(".menu .left .icon .chevron");
  });
};
