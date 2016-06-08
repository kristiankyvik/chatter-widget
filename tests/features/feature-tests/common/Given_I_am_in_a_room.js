module.exports = function() {
  this.Given(/^I am in a room$/, function () {
    browser.waitForExist("#chatter-open", 2000);
    browser.click(".chatter-open");
    browser.waitForExist("#chatter", 2000);
    browser.click(".roomList .roomListItem");
  });
};
