module.exports = function() {
  this.When(/^I click on the widget it should expand$/, function () {
    browser.click(".chatter-open");
    expect(browser.waitForExist("#chatter", 2000)).toBe(true);
    const roomListItem = browser.waitForExist(".roomListItem", 2000);
    expect(roomListItem).toBe(true);
    expect(browser.getText(".header .status span")).toEqual("Hubro Chat");
  });
};
