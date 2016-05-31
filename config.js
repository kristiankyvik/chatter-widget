Chatter.configure({
  nickProperty: "username",
  avatarProperty: "avatar"
});

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Accounts.onCreateUser(function(options, user) {
        user.firstName = options.firstName;
        user.lastName = options.lastName;
        user.avatar = "http://localhost:3000/packages/jorgeer_chatter-semantic/public/images/avatar.jpg";
        return user;
    });
  });
}
