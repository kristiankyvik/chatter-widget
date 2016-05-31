module.exports = function() {
  this.Then(/^add users$/, function () {
    expect(browser.waitForExist(".adduser-btn")).toBe(true);
    expect(browser.waitForExist(".newroom-btn")).toBe(true);
    browser.click(".adduser-btn");
    browser.click(".newroom-btn");
  });
};
