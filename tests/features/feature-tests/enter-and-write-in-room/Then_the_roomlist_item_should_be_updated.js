module.exports = function() {
  this.Then(/^the roomlist item should be updated$/, function () {
    const roomListItem = browser.waitForExist(".roomListItem", 2000);
    expect(roomListItem).toBe(true);
    expect(browser.getText(".roomListItem .description")).toEqual("test message");
    expect(browser.getAttribute(".roomListItem .avatar", "src")).toEqual("http://localhost:3000/packages/jorgeer_chatter-semantic/public/images/avatar.jpg");
  });
};
