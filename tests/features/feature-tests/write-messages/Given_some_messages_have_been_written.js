module.exports = function() {

  this.Before( function() {
    server.execute(function () {
      Accounts.createUser({
        username : "testuser2",
        password : "testuser2"
      });

    });
  });

  this.Given(/^some messages have been written$/, function () {
    server.execute( function() {
      const userIdTwo =  Meteor.users.findOne({username: "testuser2"})._id;
      const userIdOne =  Meteor.users.findOne({username: "testuser"})._id;

      const cu1 = Chatter.User.findOne({userId: userIdOne});

      const cu2Id = Chatter.addUser({
        userId: userIdTwo
      });

      const cu2 = Chatter.User.findOne(cu2Id);

      const roomId = Chatter.Room.findOne()._id;

      Chatter.addUserToRoom({
        userId: userIdTwo,
        roomId
      });

      var today = new Date();

      today.setDate(today.getDate() - 1);

      console.log(today);


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
