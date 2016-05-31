module.exports = function() {
  this.Then(/^the room is created$/, function () {
    expect(browser.waitForExist(".room")).toBe(true);
    expect(browser.getText(".menu .status span")).toEqual("Test Room");
  });
};
