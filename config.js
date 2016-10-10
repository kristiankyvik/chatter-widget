Chatter.configure({
  nickProperty: "username",
  avatarProperty: "avatar",
  helpButton: true,
  editableNickname: false
});

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}
