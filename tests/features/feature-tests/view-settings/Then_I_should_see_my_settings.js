module.exports = function () {
  this.Then(/^I should see my settings$/, function () {
    const settingsBtn = browser.elements(".icon.item").value[1].ELEMENT;
    browser.elementIdClick(settingsBtn);
    expect(browser.waitForExist(".profile", 2000)).toBe(true);
    expect(browser.getText(".ui.header.centered")).toEqual("testuser's Profile");
  });
};
