const inIframe = function () {
  try {
      return window.self !== window.top;
  } catch (e) {
      return true;
  }
}

const chatterDispatcher = {
  minimize: function() {
    const data = {
      origin: "chatter-child",
      message: "minimizeChatter"
    };
    window.parent.postMessage(data, "*");
  },

  expand: function() {
    const data = {
      origin: "chatter-child",
      message: "expandChatter"
    };
    window.parent.postMessage(data, "*");
  },

  show: function() {
    console.log("show being called");
    const data = {
      origin: "chatter-child",
      message: "showChatter"
    };
    window.parent.postMessage(data, "*");
  },

  hide: function() {
    console.log("hide being called");
    const data = {
      origin: "chatter-child",
      message: "hideChatter"
    };
    window.parent.postMessage(data, "*");
  }
};

if (Meteor.isClient) {
  Tracker.autorun(function() {
    console.log("check if user is logged in");
    if (Meteor.userId()) {
      console.log("User is logged in");
      $("body").on("click", "#chatter-close", function () {
        const check = inIframe();
        check ? chatterDispatcher.minimize() : Session.set("chatOpen", false);
      });
      $("body").on("click", "#chatter-open", function () {
        const check = inIframe();
        check ? chatterDispatcher.expand() : Session.set("chatOpen", true);
      });
      chatterDispatcher.show();
    } else {
      console.log("User is not logged in");
    }
  });

  window.onmessage = function(e){
    console.log("child received from parent!:  ", e.data);
    if (e.data.origin == "chatter-parent" && e.data.message == "loginChatter") {
      console.log("check if user has logged in");
      Meteor.loginWithPassword(e.data.username, e.data.password);
    } else if (e.data.origin == "chatter-parent" && e.data.message == "logoutChatter") {
      Meteor.logout();
    } else if (e.data.origin == "chatter-parent" && e.data.message == "minimizedChatter") {
      Session.set("chatOpen", false);
    } else if (e.data.origin == "chatter-parent" && e.data.message == "expandedChatter") {
      Session.set("chatOpen", true);
    } else {
    }
  };
}
