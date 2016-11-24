module.exports = function () {
  let userIdTwo;
  this.Before(function () {
    server.execute(function () {
      userIdTwo = Accounts.createUser({
        username: "testuser2",
        password: "testuser2"
      });
    });
  });

  this.Given(/^some messages have been written$/, function () {
    server.execute(function () {
      const cu1 = Meteor.users.findOne(userIdOne);
      const cu2 = Meteor.users.findOne(userIdTwo);

      Chatter.addUserToRoom({
        userId: userIdTwo,
        roomId
      });

      var today = new Date();

      today.setDate(today.getDate() - 1);

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
        userId: cu1._id,
        roomId: roomId,
        avatar: cu1.avatar,
        nickname: cu1.nickname
      }).save();

      new Chatter.Message({
        message: "message",
        userId: cu1._id,
        roomId: roomId,
        avatar: cu1.avatar,
        nickname: cu1.nickname
      }).save();

      new Chatter.Message({
        message: "message",
        userId: cu2._id,
        roomId: roomId,
        avatar: cu2.avatar,
        nickname: cu2.nickname
      }).save();

      new Chatter.Message({
        message: "message",
        userId: cu2._id,
        roomId: roomId,
        avatar: cu2.avatar,
        nickname: cu2.nickname
      }).save();
    });
  });
};
