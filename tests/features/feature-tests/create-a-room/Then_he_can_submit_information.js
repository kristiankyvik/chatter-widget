module.exports = function() {
  this.Then(/^he can submit information$/, function () {
    expect(browser.waitForExist(".newRoom")).toBe(true);
    expect(browser.waitForExist('input[name="name"]')).toBe(true);
    expect(browser.waitForExist('input[name="description"]')).toBe(true);
    expect(browser.getText(".menu .header .status span")).toBe("New channel");
    browser.setValue('input[name="name"]', "Test Room");
    browser.setValue('input[name="description"]', "test room description");
    browser.click(".addusers-btn");
  });
};
