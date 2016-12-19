module.exports = function () {
  this.Given(/^I am in a room$/, function () {
    browser.click(".roomList .roomListItem");
    browser.waitForExist(".room", 2000);
  });
};
