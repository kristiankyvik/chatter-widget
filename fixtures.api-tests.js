import { Meteor } from 'meteor/meteor';

const emptyDatabase = function() {
  Chatter.User.remove({});
  Chatter.UserRoom.remove({});
  Chatter.Room.remove({});
  Chatter.Message.remove({});
  Meteor.users.remove({});
};

Meteor.methods({
  "createTestUser"() {
    emptyDatabase();

    Accounts.createUser({
      email : "kyvik_bcn@yahoo.es",
      password : "banana"
    });

    const meteorUser = Meteor.users.findOne();

    Chatter.User.insert({
      userId: meteorUser._id,
      nickname: meteorUser.emails[0].address
    });
  },

  "createTestAdmin"() {
    emptyDatabase();

    Accounts.createUser({
      email : "kyvik_bcn@yahoo.es",
      password : "banana"
    });

    const meteorUser = Meteor.users.findOne();

    Chatter.User.insert({
      userId: meteorUser._id,
      nickname: meteorUser.emails[0].address,
      userType: "admin"
    });
  },

  "createTestRoom"() {
    const roomId = Chatter.Room.insert({
      name: "Test Room",
      description: "This is the description of the test room"
    });

    Chatter.UserRoom.insert({
      userId: Chatter.User.findOne()._id,
      roomId: roomId
    });
  }

});
