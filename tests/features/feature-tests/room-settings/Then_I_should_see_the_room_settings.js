module.exports = function () {
  this.Then(/^I should see the room settings$/, function () {
    const doesExist = browser.waitForExist(".settings", 2000);
    expect(doesExist).toBe(true);
    expect(browser.getText(".header .status span")).toEqual("Channel settings");
    expect(browser.getText(".settings .room-description")).toEqual("this is a test room");
    const users = browser.elements(".room-user").value;
    expect(users.length).toEqual(1);
  });
};
