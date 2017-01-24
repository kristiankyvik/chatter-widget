Chatter.configure({
  nickProperty: "username",
  avatarProperty: "avatar",
  editableNickname: false,
  chatName: "Hubro Chat"
});

if ( Meteor.users.find().count() === 0 ) {
  // Create Chatter Default API User
  Accounts.createUser({
    username: 'chatter-admin',
    password: 'chatter-admin',
    profile: {
      isChatterAdmin: true,
      chatterNickname: 'chatter-admin',
      supportUser: null
    }
  });

  // Create Hubro Super User in Chatter
  Accounts.createUser({
    username: 'admin',
    password: 'admin-1',
    profile: {
      chatterNickname: 'admin',
      supportUser: null
    }
  });
}

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}


