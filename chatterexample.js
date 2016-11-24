Meteor.startup(function () {
  if (Meteor.isClient) {
    // Log out user in order to authenticate again
    // WARNIUNG: uncomment when deploying
    // Meteor.logout();
  }
});

if (Meteor.isClient) {
  // Helper method simply returning true when application is contained in an iframe
  const inIframe = function () {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  // Attached lazy listeners to chatter floating widget and to the minimizing button. This hack is needed in order to take control over the UI which is defined inn the chatter-semantic package.
  const attachButtonListeners = function () {
    $("body").on("click", "#chatter-close", function () {
      const check = inIframe();
      check ? chatterDispatcher.minimize() : Session.set("chatOpen", false);
    });
    $("body").on("click", "#chatter-open", function () {
      const check = inIframe();
      check ? chatterDispatcher.expand() : Session.set("chatOpen", true);
    });
  };

  // This object is the interface between the chatter application and the widget embedded in the external site. It uses the postMessage protocol to communicate with the widget.
  const chatterDispatcher = {
    // Notifies that the chatter application contained by the iframe has loaded and that it is ready to receive messages
    loaded: function () {
      const data = {
        origin: "chatter-app",
        message: "chatter-loaded"
      };
      window.parent.postMessage(data, "*");
    },

    // Notifies that the widget (iframe containing the chatter app) should be minimized
    minimize: function () {
      const data = {
        origin: "chatter-app",
        message: "minimize-widget"
      };
      window.parent.postMessage(data, "*");
    },

    // Notifies that the widget (iframe containing the chatter app) should be expanded
    expand: function () {
      const data = {
        origin: "chatter-app",
        message: "expand-widget"
      };
      window.parent.postMessage(data, "*");
    },

    // Notifies that widget should be displayed
    show: function () {
      const data = {
        origin: "chatter-app",
        message: "show-widget"
      };
      window.parent.postMessage(data, "*");
    },

    // Notifies that the widget should be hidden
    hide: function () {
      const data = {
        origin: "chatter-app",
        message: "hide-widget"
      };
      window.parent.postMessage(data, "*");
    }
  };

  // If iframe widget is open, we want to close it onload
  chatterDispatcher.minimize();
  // App has loaded and is ready to receive messages
  chatterDispatcher.loaded();
  // Attaches listeners to chatter buttons
  attachButtonListeners();

  // Check whether user has logged into the chatter app
  Tracker.autorun(function () {
    console.log("[CHATTER]: checking if user is logged to Chatter....");
    if (Meteor.userId()) {
      console.log("[CHATTER]: user is logged in to Chatter");
      // if user succesfully logged in, we want to display the widget and make sure it is minified by default
      chatterDispatcher.show();
      Session.set("chatOpen", false);
    } else {
      console.log("[CHATTER]: user is not logged in to Chatter");
    }
  });

  // Setting up message listener for multiple browsers
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

  // Listens for messages received from chatter widget and reacts accordingly
  eventer(messageEvent, function (e) {
    if (e.data.origin === "chatter-widget") {
      console.log("[FROM: widget TO: chatter] => ", e.data);
      switch(e.data.message) {
        // Attempts to login to the chatter app given credentials
      case "login-chatter":
        console.log("[CHATTER]: attempting to log in to Chatter");
        Meteor.loginWithPassword(e.data.username, e.data.password);
        break;
        // Log out of the chatter app
      case "logout-chatter":
        console.log("[CHATTER]: attempting to log off");
        Meteor.logout();
        break;
        // Widget confirms it is ready for chatter app to minimize
      case "minimized-chatter":
        Session.set("chatOpen", false);
        break;
        // Widget confirms it is ready for chatter app to expand
      case "expanded-chatter":
        Session.set("chatOpen", true);
        break;
      default:
        break;
      }
    }
  }, false);
}


