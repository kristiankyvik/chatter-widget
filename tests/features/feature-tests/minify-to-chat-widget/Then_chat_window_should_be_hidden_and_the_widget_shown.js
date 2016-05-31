module.exports = function() {
  this.Then(/^chat window should be hidden and the widget shown$/, function () {
    expect(browser.waitForExist(".chatter-open")).toBe(true);
  });
};
