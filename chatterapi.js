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
        users: [Match.ObjectIncluding({username: String, password: String, admin: Match.Optional(Match.OneOf(Boolean, String, undefined)), supportUser: Match.Optional(Match.OneOf(String, undefined))})],
        rooms: [Match.ObjectIncluding({name: String, users: [String]})]
      });

      const {users, rooms} = this.bodyParams;
      const response = {
        users: [],
        rooms: []
      };

      users.forEach(function(user) {
        const isAdmin = user.admin ? true : false;
        const exists = Meteor.users.findOne({username: user.username});
        let userId = null;

        if (!exists) {
          userId = Accounts.createUser({
            username: user.username,
            password: user.password
          });

          Chatter.addUser({
            userId,
            admin: isAdmin,
            supportUser: user.supportUser
          });

        } else {
          userId = exists._id
        }

        response.users.push({
          userId,
          username: user.username,
          admin: isAdmin,
          supportUser: user.supportUser
        });
      });

      rooms.forEach(function(room) {
        const groupRoom = Chatter.addRoom({
          name: room.name,
          description: room.description,
          ref: room.ref
        });

        const roomResp = {
          name: room.name,
          roomId: groupRoom,
          users: [],
          ref: room.ref
        };

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

          roomResp.users.push(user);
        });

        response.rooms.push(roomResp)

      });
      return response;
    }
  });

  Api.addRoute('addRoom', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        name: String,
        description: String,
        roomType: Match.Optional(Match.OneOf(String, undefined)),
        ref: Match.Optional(Match.OneOf(String, undefined))
      });

      return Chatter.addRoom({
        name: this.bodyParams.name,
        description: this.bodyParams.description,
        roomType: this.bodyParams.roomType,
        ref: this.bodyParams.ref
      });
    }
  });

  Api.addRoute('removeRoom', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        roomId: String
      });

      return Chatter.removeRoom({
        roomId: this.bodyParams.roomId
      });
    }
  });

  Api.addRoute('addUser', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        username: String,
        password: String,
        admin: Match.Optional(Match.OneOf(Boolean, String, undefined)),
        supportUser: Match.Optional(Match.OneOf(String, undefined)),
        inClass: Match.Optional(Match.OneOf(String, undefined))
      });

      const {username, password, admin, supportUser, inClass} = this.bodyParams;
      const isAdmin = admin ? true : false;

      const userId = Accounts.createUser({
        username,
        password
      });

      Meteor.users.update(
        {_id: userId},
        { $set: {
          "profile.isChatterAdmin": isAdmin,
          "profile.supportUser": supportUser,
          "profile.inClass": inClass,
        }
      });
      return userId
    }
  });

  Api.addRoute('removeUser', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        username: String
      });

      const user = Meteor.users.findOne({username: this.bodyParams.username});

      if (!user) {
        throw new Meteor.Error("unknown-user", "user cannot be recognized");
      }

      userId = user._id;

      return Chatter.removeUser({
        userId
      });
    }
  });

  Api.addRoute('setNickname', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        username: String,
        nickname: String
      });

      const {username, nickname} = this.bodyParams;

      const user = Meteor.users.findOne({username: username});

      if (!user) {
        throw new Meteor.Error("unknown-user", "user cannot be recognized");
      }

      userId = user._id;

      return Chatter.setNickname({
        userId,
        nickname
      });
    }
  });

  Api.addRoute('getRoom', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        ref: String
      });

      const {ref} = this.bodyParams;

      return Chatter.Room.findOne({ref})._id;
    }
  });

  Api.addRoute('addUserToRoom', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        username: String,
        roomId: Match.Optional(Match.OneOf(String, undefined)),
        ref: Match.Optional(Match.OneOf(String, undefined))
      });

      const {username, roomId, ref} = this.bodyParams;

      const user = Meteor.users.findOne({username: username});
      if (!user) {
        throw new Meteor.Error("unknown-user", "user cannot be recognized");
      }
      userId = user._id;
      return Chatter.addUserToRoom({
        userId,
        roomId
      });
    }
  });

  Api.addRoute('removeUserFromRoom', {authRequired: true}, {
    post: function () {
      check(this.bodyParams, {
        username: String,
        roomId: String
      });

      const user = Meteor.users.findOne({username: this.bodyParams.username});
      if (!user) {
        throw new Meteor.Error("unknown-user", "user cannot be recognized");
      }
      const userId = user._id;

      return Chatter.removeUserFromRoom({
        userId: userId,
        roomId: this.bodyParams.roomId
      });
    }
  });
}

