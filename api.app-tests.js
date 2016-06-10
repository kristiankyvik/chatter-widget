console.log("running intergration api tests");

const callbackWrapper = function(fn) {
	return function(error, response) {
		setTimeout(() => fn(error, response));
	};
};

const emptyDatabase = function() {
	Chatter.UserRoom.remove({});
	Chatter.Room.remove({});
	Chatter.Message.remove({});
	Meteor.users.remove({});
};

if (Meteor.isServer) {
	const body = {};
	let userId;

	before(function() {
		emptyDatabase();
		userId = Accounts.createUser({
			username: "testuser",
			password:"testpassword"
		});
	});

	describe("chatter widget api", function() {

		describe("when user is not logged in", function() {
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

		describe("and when the user creates a user account", function() {

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

			it("return token and user id when passing correct credentials", function(done) {
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

		describe("and when user is logged in", function() {
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

			describe("and when the /[setup] endpoint is hit with the right parameters", function() {
				let u1, u2, r1, r2, r3;

				before(function(done) {
					body.data = {
						"users": [
							{
								"username": "user1",
								"password": "user1"
							},
							{
								"username": "user2",
								"password": "user2",
								"admin": true
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

				it("users are added correctly", function() {
					u1 = Meteor.users.findOne({username: "user1"});
					u2 = Meteor.users.findOne({username: "user2"});

					assert.isDefined(u1);
					assert.equal(u1.profile.isChatterUser, true);
					assert.equal(u1.profile.chatterNickname, "user1");
					assert.equal(u1.profile.chatterAvatar, `http://api.adorable.io/avatars/${u1.username}`);
					assert.equal(u1.profile.isChatterAdmin, false);

					assert.isDefined(u2);
					assert.equal(u2.profile.isChatterUser, true);
					assert.equal(u2.profile.chatterNickname, "user2");
					assert.equal(u2.profile.chatterAvatar, `http://api.adorable.io/avatars/${u2.username}`);
					assert.equal(u2.profile.isChatterAdmin, true);
				});

				it("rooms are added correctly", function() {
					r1 = Chatter.Room.findOne({name: "user1"});
					r2 = Chatter.Room.findOne({name: "user2"});
					r3 = Chatter.Room.findOne({name: "class chat"});

					assert.isDefined(r1);
					assert.isDefined(r2);
					assert.isDefined(r3);
				});

				it("users are aded to rooms correctly", function() {
					const ur1 = Chatter.UserRoom.findOne({userId: u1._id, roomId: r1._id});
					const ur2 = Chatter.UserRoom.findOne({userId: u2._id, roomId: r2._id});
					const ur3 = Chatter.UserRoom.findOne({userId: u1._id, roomId: r3._id});
					const ur4 = Chatter.UserRoom.findOne({userId: u2._id, roomId: r3._id});

					assert.isDefined(ur1);
					assert.isDefined(ur2);
					assert.isDefined(ur3);
					assert.isDefined(ur4);
				});
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

			describe("and when the /[addRoom] endpoint is hit with the right parameters", function() {

				before(function(done) {
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

				it("rooms are added correctly", function() {
					const r1 = Chatter.Room.findOne({name: "testroom"});
					assert.equal(r1.name, "testroom");
					assert.equal(r1.description, "testdescription");
				});
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

			describe("and when the /[addUser] endpoint is hit with the right parameters", function() {

				before(function(done) {
					body.data = {
						"username": "newuser1",
						"password": "newpassword"
					};

					Meteor.http.call("POST", Meteor.absoluteUrl("api/addUser"), body, callbackWrapper((error, response) => {
						assert.equal(response.statusCode, 200);
						assert.isString(response.data);
					}));

					body.data = {
						"username": "newuser2",
						"password": "newpassword2",
						"admin": true
					};

					Meteor.http.call("POST", Meteor.absoluteUrl("api/addUser"), body, callbackWrapper((error, response) => {
						assert.equal(response.statusCode, 200);
						assert.isString(response.data);
						done();
					}));
				});

				it("user are added correctly", function() {
					const u1 = Meteor.users.findOne({username: "newuser1"});
					assert.equal(u1.profile.isChatterUser, true);
					assert.equal(u1.profile.chatterNickname, "newuser1");
					assert.equal(u1.profile.chatterAvatar, `http://api.adorable.io/avatars/${u1.username}`);
					assert.equal(u1.profile.isChatterAdmin, false);

					const u2 = Meteor.users.findOne({username: "newuser2"});
					assert.equal(u2.profile.isChatterUser, true);
					assert.equal(u2.profile.chatterNickname, "newuser2");
					assert.equal(u2.profile.chatterAvatar, `http://api.adorable.io/avatars/${u2.username}`);
					assert.equal(u2.profile.isChatterAdmin, true);
				});
			});

			describe("and a room and user have been added", function() {
				let roomId, userId;

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

				describe("and when the /[addUserToRoom] endpoint is hit with the right parameters", function() {

					before(function(done) {
						body.data = {
							username: "newuser1",
							roomId
						};

						Meteor.http.call("POST", Meteor.absoluteUrl("api/addUserToRoom"), body, callbackWrapper((error, response) => {
							assert.equal(response.statusCode, 200);
							assert.isString(response.data);
							done();
						}));
					});

					it("user is added to correct room", function() {
						userId = Meteor.users.findOne({username: "newuser1"})._id;
						const ur = Chatter.UserRoom.findOne({userId, roomId});
						assert.isDefined(ur);
					});
				});

				describe("and when the /[removeUserFromRoom] endpoint is hit with the right parameters", function() {

					before(function(done) {

						body.data = {
							roomId,
							username: "newuser1"
						};

						Meteor.http.call("POST", Meteor.absoluteUrl("api/removeUserFromRoom"), body, callbackWrapper((error, response) => {
							assert.equal(response.statusCode, 200);
							assert.isNumber(response.data);
							done();
						}));
					});

					it("the user actually removes the user from the room", function() {
						const ur = Chatter.UserRoom.findOne({userId, roomId});
						assert.isUndefined(ur);
					});

					describe("and when the /[removeUser] endpoint is hit with the right parameters", function() {

						before(function(done) {
							body.data = {
								username: "testuser"
							};

							Meteor.http.call("POST", Meteor.absoluteUrl("api/removeUser"), body, callbackWrapper((error, response) => {
								assert.equal(response.statusCode, 200);
								assert.isString(response.data);
								done();
							}));
						});

						it("user is removed as expected", function() {
							const u = Meteor.users.findOne({username: "testuser"});
							assert.isUndefined(u);
						});
					});
				});
			});
		});
	});
}
