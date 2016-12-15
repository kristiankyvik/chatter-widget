module.exports = function () {
  this.When(/^I click on the archive button$/, function () {
    browser.click(".settings .ui.toggle.checkbox");
    browser.click(".left.menu .item.icon");
    expect(browser.waitForExist(".room", 2000)).toBe(true);
    browser.click(".left.menu .item.icon");
    expect(browser.waitForExist(".roomList", 2000)).toBe(true);
  });
};
