module.exports = function() {
  this.Then(/^the chat window should reappear$/, function () {
    expect(browser.waitForExist("#chatter")).toBe(true);
  });
};
