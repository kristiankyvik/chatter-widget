module.exports = function () {
  this.When(/^I click on close I should see the rooms$/, function () {
    browser.click(".close.icon");
    expect(browser.waitForExist(".roomList", 2000)).toBe(true);
    expect(browser.getText(".header .status span")).toEqual("Hubro Chat");
  });
};
