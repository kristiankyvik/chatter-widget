module.exports = function () {
  this.When(/^when I go back to the room list$/, function () {
    browser.click(".left.menu .icon.item");
    expect(browser.waitForExist(".roomList", 2000)).toBe(true);
  });
};