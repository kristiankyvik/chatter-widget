module.exports = function () {
  this.When(/^I click on active channels, the list should minimize$/, function () {
    browser.click(".active-rooms .title.active");
    browser.pause(2000);
    expect(browser.isVisible(".active-rooms > .content")).toBe(false);
  });
};
