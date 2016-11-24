module.exports = function () {
  this.When(/^I should see the room I created$/, function () {
    expect(browser.getText(".roomListItem .description")).toEqual("no messages yet");
    expect(browser.getText(".roomListItem .header .roomName")).toEqual("Test Room");
  });
};
