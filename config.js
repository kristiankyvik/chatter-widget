Chatter.configure({
  nickProperty: "username",
  avatarProperty: "avatar",
  helpButton: true,
  helpUser: "admin"
});

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}

if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile ? options.profile : {};
    user.profile.isChatterUser = true;
    user.profile.chatterNickname = user.username;
    user.profile.chatterAvatar = `http://api.adorable.io/avatars/${user.username}`;
    return user;
  });

  // Default user created for you to use
  if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
      username: 'chatter-admin',
      password: 'chatter-admin'
    });
  }
}

