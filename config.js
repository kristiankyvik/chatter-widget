Chatter.configure({
  nickProperty: "username",
  avatarProperty: "avatar"
});

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}

