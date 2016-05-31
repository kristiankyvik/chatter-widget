module.exports = function() {
  this.Then(/^the message should appear$/, function () {
    const room = browser.waitForExist(".chatter-msg", 2000);
    expect(room).toBe(true);
    expect(browser.getText(".chatter-msg .content .author")).toEqual("kyvik_bcn@yahoo.es");
    expect(browser.getText(".chatter-msg .content .date")).toEqual("a few seconds ago");
    expect(browser.getAttribute(".chatter-msg .avatar img", "src")).toEqual("http://localhost:3000/packages/jorgeer_chatter-semantic/public/images/avatar.jpg");

  });
};
