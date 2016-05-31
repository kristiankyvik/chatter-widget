
if (Meteor.isClient) {
  window.onmessage = function(e){
    if (e.data.origin == "chatter-parent" && e.data.command == "login") {
      var data = e.data;
      Meteor.loginWithPassword(data.username, data.password);
    } else if (e.data.origin == "chatter-parent" && e.data.command == "logoff") {
      Meteor.logout();
    }
  };
}
