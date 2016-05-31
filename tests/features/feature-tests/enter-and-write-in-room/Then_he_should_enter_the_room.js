module.exports = function() {
  this.Then(/^he should enter the room$/, function () {
    const room = browser.waitForExist(".room", 2000);
    expect(room).toBe(true);
    expect(browser.waitForExist(".writer .field #message")).toBe(true);
    expect(browser.waitForExist(".menu.right .icon .setting")).toBe(true);
    expect(browser.waitForExist(".menu.right .icon .minus")).toBe(true);
    expect(browser.waitForExist(".menu.left .icon .chevron")).toBe(true);
    expect(browser.getText(".menu .status span")).toEqual("Test Room");
  });
};
