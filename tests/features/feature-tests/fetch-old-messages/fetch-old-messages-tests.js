module.exports = function () {
  this.Given(/^I have many old messages$/, function () {
    server.execute(function () {
      const cu1 = Meteor.users.findOne(userIdOne);
      const cu2 = Meteor.users.findOne(userIdTwo);

      Chatter.addUserToRoom({
        userId: userIdTwo,
        roomId
      });

      var today = new Date();

      today.setDate(today.getDate() - 1);

      for (var i = 0; i < 51; i++) {
        new Chatter.Message({
          message: "message",
          userId: cu1._id,
          roomId: roomId,
          avatar: cu1.avatar,
          nickname: cu1.nickname,
          publishedAt: today
        }).save();

        new Chatter.Message({
          message: "message",
          userId: cu2._id,
          roomId: roomId,
          avatar: cu2.avatar,
          nickname: cu2.nickname
        }).save();
      }
    });
    browser.pause(4000);
  });

  this.Then(/^I should see only the recent messages$/, function () {
    const doesExist = browser.waitForExist(".scrollable", 2000);
    expect(doesExist).toBe(true);
    browser.pause(2000);
    browser.click(".scrollable");
    for (var i = 0; i < 350; i++) {
      browser.keys("ArrowUp");
    }
    const messages = browser.elements(".chatter-msg .text").value;
    expect(messages.length).toEqual(100);
  });

  this.When(/^I scroll up$/, function () {
    browser.scroll(".scrollable", 100, 600);
    browser.pause(4000);
  });

  this.Then(/^I should see older messages$/, function () {
    const messages = browser.elements(".chatter-msg .text").value;
    expect(messages.length).toEqual(102);
  });
};
