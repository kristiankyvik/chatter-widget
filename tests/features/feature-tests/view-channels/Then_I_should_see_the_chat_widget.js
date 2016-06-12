module.exports = function() {
  this.Then(/^I should see the chat widget$/, function () {
    var doesExist = browser.waitForExist("#chatter-open", 2000);
    expect(doesExist).toBe(true);
  });
};
