if (Meteor.isServer) {
  // Global API configuration
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    enableCors: true
  });

  Api.addRoute('setup', {authRequired: true}, {

    post: function () {
      check(this.bodyParams, {
        users: [Match.ObjectIncluding({username: String, password: String, userType: Match.Maybe(String)})],
        rooms: [Match.ObjectIncluding({name: String, users: [String]})]
      });

      const {users, rooms} = this.bodyParams;

      users.forEach(function(user) {
        const userId = Accounts.createUser({
          username: user.username,
          password: user.password
        });

        const chatterUserId = Chatter.addUser({
          userId: userId,
          userType: user.userType
        });
      });

      rooms.forEach(function(room) {
        const groupRoom = Chatter.addRoom({
          name: room.name,
          description: "group room"
        });

        room.users.forEach(function(user) {
          const userCheck = Meteor.users.findOne({username: user});
          if (!userCheck) {
            throw new Meteor.Error("unknown-username", "username does not exist");
          }
          const userId = userCheck._id;
          Chatter.addUserToRoom({
            userId: userId,
            roomId: groupRoom
          });
        });

      });
      return this.bodyParams;
    }
  });

  Api.addRoute('addRoom', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        name: String,
        description: String
      });

      return Chatter.addRoom({
        name: this.bodyParams.name,
        description: this.bodyParams.description
      });
    }
  });

  Api.addRoute('addUser', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        username: String,
        password: String,
        userType: Match.Maybe(String)
      });

      const {username, password, userType} = this.bodyParams;
      const userId = Accounts.createUser({
        username,
        password
      });

      return Chatter.addUser({
        username,
        userType
      });
    }
  });

  Api.addRoute('addUserToRoom', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        userId: String,
        roomId: String
      });

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

