module.exports = function() {
  this.Then(/^I should see the chat widget$/, function () {
    var doesExist = browser.waitForExist("#chatter");
    expect(doesExist).toBe(true);
  });
};
