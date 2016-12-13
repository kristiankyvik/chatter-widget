module.exports = function () {
  this.Given(/^the chat is open$/, function () {
    expect(browser.waitForExist(".chatter-open", 2000)).toBe(true);
    browser.click(".chatter-open");
    expect(browser.waitForExist("#chatter", 2000)).toBe(true);
  });
};