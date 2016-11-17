Chatter.configure({
  nickProperty: "username",
  avatarProperty: "avatar",
  editableNickname: false,
  chatName: "Hubro Chat"
});

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });
}
