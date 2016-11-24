const fixtures = {
  clientLogin: function (user) {
    client.url('http://localhost:3000');
    client.execute(function (user, done) {
      Meteor.loginWithPassword(user.username, user.password, done);
    }, user);
  }
};

module.exports = function () {
  this.Before( function () {
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
      Accounts.createUser({
        username: "testuser",
        password: "testuser"
      });
    });
  });

  this.Given(/^I am logged in and have a chatter user$/, function () {
    server.execute( function () {
      const userId = Meteor.users.findOne()._id;

      Chatter.addUser({
        userId
      });

      const roomId = Chatter.addRoom({
        name: "Test Room",
        description: "this is a test room"
      });

      Chatter.addUserToRoom({
        userId,
        roomId
      });
    });

    fixtures.clientLogin({username: "testuser", password: "testuser"});
  });
};
