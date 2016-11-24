const fixtures = {
  clientLogin: function (user) {
    client.url('http://localhost:3000');
    client.execute(function (user, done) {
      Meteor.loginWithPassword(user.username, user.password, done);
    }, user);
  }
};

let userIdOne;
let roomId;

module.exports = function () {
  this.Before( function () {
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
      userIdOne = Accounts.createUser({
        username: "testuser",
        password: "testuser"
      });
    });
  });

  this.Given(/^I am logged in and have a chatter user$/, function () {
    server.execute( function () {
      roomId = Chatter.addRoom({
        name: "Test Room",
        description: "this is a test room"
      });

      Chatter.addUserToRoom({
        userId: userIdOne,
        roomId
      });
    });

    fixtures.clientLogin({username: "testuser", password: "testuser"});
  });
};
