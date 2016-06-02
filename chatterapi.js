if (Meteor.isServer) {
  // Global API configuration
  var Api = new Restivus({
    useDefaultAuth: false,
    prettyJson: true,
    enableCors: true
  });

  Api.addRoute('setup', {authRequired: false}, {
    post: function () {
      const {users, rooms} = this.bodyParams;

      users.forEach(function(user) {
        const userId = Accounts.createUser({
          username: user.username,
          password: user.password
        });

        const chatterUserId = Chatter.addUser({
          userId: userId
        });
      });

      rooms.forEach(function(room) {
        const groupRoom = Chatter.addRoom({
          name: room.name,
          description: "group room"
        });

        room.users.forEach(function(user) {
          const userId = Meteor.users.findOne({username: user})._id;
          Chatter.addUserToRoom({
            userId: userId,
            roomId: groupRoom
          });
        });

      });
      return this.bodyParams;
    }
  });

  Api.addRoute('addRoom', {authRequired: false}, {
    post: function () {
      return Chatter.addRoom({
        name: this.bodyParams.name,
        description: this.bodyParams.description
      });
    }
  });

  Api.addRoute('addUser', {authRequired: false}, {
    post: function () {
      const userId = Accounts.createUser({
        username: this.bodyParams.username,
        password: this.bodyParams.username
      });
      return Chatter.addUser({
        userId: userId
      });
    }
  });

  Api.addRoute('addUserToRoom', {authRequired: false}, {
    post: function () {
      const user = Meteor.users.findOne({username: this.bodyParams.username});
      if (!user) {
        throw new Meteor.Error("unknown-user", "user cannot be recognized");
      }
      userId = user._id;
      return Chatter.addUserToRoom({
        userId: userId,
        roomId: this.bodyParams.roomId
      });
    }
  });
}

