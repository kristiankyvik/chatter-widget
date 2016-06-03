console.log("running intergration api tests");

const callbackWrapper = function(fn) {
  return function(error, response) {
    setTimeout(() => fn(error, response));
  };
};

const emptyDatabase = function() {
  Chatter.User.remove({});
  Chatter.UserRoom.remove({});
  Chatter.Room.remove({});
  Chatter.Message.remove({});
  Meteor.users.remove({});
};

if (Meteor.isServer) {
  const body = {};

  before(function() {
    emptyDatabase();
    Accounts.createUser({
      username: "testuser",
      password:"testpassword"
    });
  });

  describe("chatter widget api", function() {

    describe("when user does not log in", function() {
      it("does not allow unauthorized requests ", function(done) {

        body.data = {
          "name": "test room",
          "description": "test description"
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/addRoom"), body, callbackWrapper((error, response) => {
          assert.equal(response.data.status, "error");
          done();
        }));
      });
    });

    describe("when user creates a user account", function() {

      it("return error when passing wrong parameters", function(done) {

        body.data = {
          "name": "wronguser",
          "description": "wrongpassword"
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/login"), body, callbackWrapper((error, response) => {
          assert.equal(response.data.status, "error");
          done();
        }));
      });

      it("return token anf user id when passing correct credentials", function(done) {
        const userId = Meteor.users.findOne({username: "testuser"})._id;

        body.data = {
          "username": "testuser",
          "password": "testpassword"
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/login"), body, callbackWrapper((error, response) => {
          assert.equal(response.data.status, "success");
          assert.isString(response.data.data.authToken);
          assert.equal(response.data.data.userId, userId);
          done();
        }));
      });
    });


    describe("when user is logged in logged in", function() {

      before(function(done) {
        Meteor.http.call("POST", Meteor.absoluteUrl("api/login"), body, callbackWrapper((error, response) => {
          assert.equal(response.data.status, "success");
          const authToken = response.data.data.authToken;
          const userId = response.data.data.userId;
          body.headers = {
            "X-Auth-Token": authToken,
            "X-User-Id": userId
          };
          done();
        }));
      });

      it("/[setup] endpoint returns an error when wrong format is sent", function(done) {

        body.data = {
          "users": [
            {
              "username": "user1"
            }
          ],
          "rooms": [
            {
              "name": "user1",
              "users": ["user1"]
            }
          ]
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/setup"), body, callbackWrapper((error, response) => {
          assert.equal(response.statusCode, 500);
          assert.isNull(response.data);
          done();
        }));
      });

      it("/[setup] endpoint returns summary when right format is sent", function(done) {

        body.data = {
          "users": [
            {
              "username": "user1",
              "password": "user1"
            },
            {
              "username": "user2",
              "password": "user2"
            }
          ],
          "rooms": [
            {
              "name": "user1",
              "users": ["user1"]
            },
            {
              "name": "user2",
              "users": ["user2"]
            },
            {
              "name": "class chat",
              "users": ["user1", "user2"]
            }
          ]
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/setup"), body, callbackWrapper((error, response) => {
          assert.equal(response.statusCode, 200);
          done();
        }));
      });

      it("/[addRoom] endpoint returns error when wrong parameters are sent", function(done) {

        body.data = {
          name: "testroom",
          description: "testdescription",
          unallowedAttribute: "unallowed"
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/addRoom"), body, callbackWrapper((error, response) => {
          assert.equal(response.statusCode, 500);
          done();
        }));
      });

      it("/[addRoom] endpoint succeds when correct parameters are sent", function(done) {

        body.data = {
          name: "testroom",
          description: "testdescription"
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/addRoom"), body, callbackWrapper((error, response) => {
          assert.equal(response.statusCode, 200);
          assert.isString(response.data);
          done();
        }));
      });

      it("/[addUser] endpoint returns error when wrong parameters are sent", function(done) {

        body.data = {
          unallowedAttribute: "unallowed"
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/addUser"), body, callbackWrapper((error, response) => {
          assert.equal(response.statusCode, 500);
          done();
        }));
      });

      it("/[addUser] endpoint succeds when correct parameters are sent", function(done) {

        body.data = {
          "username": "newuser",
          "password": "newpassword"
        };

        Meteor.http.call("POST", Meteor.absoluteUrl("api/addUser"), body, callbackWrapper((error, response) => {
          assert.equal(response.statusCode, 200);
          assert.isString(response.data);
          done();
        }));
      });

      describe("and a room and user have been added", function() {
        let roomId;

        before(function(done) {
          roomId = Chatter.addRoom({
            name: "testroom",
            description: "testdescription"
          });
          done();
        });

        it("/[addUserToRoom] endpoint returns error when wrong parameters are sent", function(done) {

          body.data = {
            unallowedAttribute: "unallowed",
            username: "newuser",
            roomId
          };

          Meteor.http.call("POST", Meteor.absoluteUrl("api/addUserToRoom"), body, callbackWrapper((error, response) => {
            assert.equal(response.statusCode, 500);
            done();
          }));
        });

        it("/[addUserToRoom] endpoint returns error when unexistent room is sent", function(done) {

          body.data = {
            username: "newuser",
            roomId: "fakeroomid"
          };

          Meteor.http.call("POST", Meteor.absoluteUrl("api/addUserToRoom"), body, callbackWrapper((error, response) => {
            assert.equal(response.statusCode, 500);
            done();
          }));
        });

        it("/[addUserToRoom] endpoint returns error when unexistent user is sent", function(done) {

          body.data = {
            username: "fakeuserid",
            roomId
          };

          Meteor.http.call("POST", Meteor.absoluteUrl("api/addUserToRoom"), body, callbackWrapper((error, response) => {
            assert.equal(response.statusCode, 500);
            done();
          }));
        });

        it("/[addUserToRoom] endpoint succeds when correct parameters are sent", function(done) {

          body.data = {
            username: "newuser",
            roomId
          };

          Meteor.http.call("POST", Meteor.absoluteUrl("api/addUserToRoom"), body, callbackWrapper((error, response) => {
            assert.equal(response.statusCode, 200);
            assert.isString(response.data);
            done();
          }));
        });

      });


    });
  });
}
