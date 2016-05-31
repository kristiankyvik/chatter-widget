module.exports = function() {
  this.Then(/^the room should be archived$/, function () {
    browser.waitForExist(".archived-rooms .count");
    expect(browser.getText(".archived-rooms .count")).toBe("(1)");
  });
};
