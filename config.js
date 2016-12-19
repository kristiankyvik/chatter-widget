Chatter.configure({
  nickProperty: "username",
  avatarProperty: "avatar",
  editableNickname: false,
  chatName: "Hubro Chat"
});

if ( Meteor.users.find().count() === 0 ) {
  Accounts.createUser({
    username: 'chatter-admin',
    password: 'chatter-admin',
    profile: {
      isChatterAdmin: true,
      chatterNickname: 'chatter-admin',
      supportUser: null
    }
  });
}

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}


