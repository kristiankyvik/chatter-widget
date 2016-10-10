Chatter.configure({
  nickProperty: "username",
  avatarProperty: "avatar",
  helpButton: true,
  helpChannel: "admin",
  editableNickname: false
});

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}
