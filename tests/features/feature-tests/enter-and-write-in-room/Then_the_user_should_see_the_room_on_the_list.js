module.exports = function() {
  this.Then(/^the user should see the room on the list$/, function () {
    const roomListItem = browser.waitForExist(".roomListItem", 2000);
    expect(roomListItem).toBe(true);
    expect(browser.getText(".roomListItem .description")).toEqual("no messages yet");
    expect(browser.getText(".roomListItem .header span")[0]).toEqual("Test Room");
    expect(browser.getAttribute(".roomListItem .avatar", "src")).toEqual("http://localhost:3000/packages/jorgeer_chatter-semantic/public/images/default.jpg");

  });
};
