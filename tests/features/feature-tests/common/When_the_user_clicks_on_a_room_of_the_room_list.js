module.exports = function() {
  this.When(/^the user clicks on a room of the room list$/, function () {
    browser.waitForExist(".roomListItem", 2000);
    browser.click(".roomListItem");
  });
};
