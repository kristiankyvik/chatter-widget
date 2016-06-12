# Chatter Widget

## Configuration and setup

After downloading the source code enter the application root folder to run the `meteor` command. Then navigate to http://localhost:3000 to view the app. A default user will be created with the following credentials:

```json
username: chatter-admin
password: chatter-admin
```

This user can be used to login in the api and to make authenitcated calls.

### API Calls
The application will be hosted at http://localhost:3000, or wherever you have chosen to run your application in you local environemnt. Before using the API th user will have to authenticate. Use the dafault user to do so and the /login endpoint.

#### Methods

##### [POST] /login
This is the main entry call to the api that allows you to configure the chat settings before embedding in on your website. A JSON must be sent in as the body of the request with the following format. This will specify users and the rooms desired. The usernames need to be unique and passwords are to be sent in.

```json
{
  "username": "chatter-admin",
  "password": "chatter-admin"
}
```

The response will look like the following:

```
{ status: "success", data: {authToken: "kjf98saufs9fjdsa89f7", userId: "kjsa9df0ds9f780s9f788"} }
```

You will need to save the userId and token on the client, for subsequent authenticated requests. The headers should be set in the following way.

```
X-User-Id: "kjf98saufs9fjdsa89f7"
X-Auth-Token: "kjsa9df0ds9f780s9f788"
```


##### [POST] /setup
This is the main entry call to the api that allows you to configure the chat settings before embedding in on your website. A JSON must be sent in as the body of the request with the following format. This will specify users and the rooms desired. The usernames need to be unique and passwords are to be also predetermined. Users are by default not admins. Include the attribute `"admin":true` to create a user with admin rights.

```json
{
  "users": [
    {
      "username": "username1",
      "password": "password1",
      "admin": true
    },
    {
      "username": "username2",
      "password": "password2"
    },
    {
      "username": "username3",
      "password": "password3"
    },
    {
      "username": "username4",
      "password": "password4"
    }
  ],
  "rooms": [
    {
      "name": "Room1",
      "users": ["username1", "username2", "username3"]
    },
    {
      "name": "Room2",
      "users": ["username3", "username4"]
    }
  ]
}
```

##### [POST] /addUser
Adds a user to chatter. Returns the id of the user.

```json
{
  "username": "username",
  "password": "password"
}
```

##### [POST] /removeUser
Removes a user to chatter. Returns the id of the user.

```json
{
  "username": "username"
}
```

##### [POST] /addRoom
Adds a room to chatter. Returns id of the room.

```json
{
  "name": "username",
  "description": "password"
}
```

##### [POST] /removeRoom
Removes a room from chatter. Returns id of the room.

```json
{
  "roomId": "jkf9ds8f0dsaf089dsf"
}
```

##### [POST] /addUserToRoom
Adds a room to chatter.

```json
{
  "userId": "324kj23l40o",
  "roomId": "d9saf8df9sa"
}
```

##### [POST] /removeUserFromRoom
Removes a user from a room.

```json
{
  "userId": "324kj23l40o",
  "roomId": "d9saf8df9sa"
}
```

### Ebbedable snippet

In order to add the chat instance to your website you a small snippet of javascript will need to be added to your source code. The snippet will take care of embedding a new iframe containing the chatter application on your site. Please note that the CHATTER_APP_URL needs to be changed to whatever location your chatter application is running in.

```javascript
  // Creating styles tag containing the CSS for the widget. The height of the widget is set to be the size of the window of the parent
  var s = document.createElement("style");
  s.innerHTML = "#chatter-widget{position:absolute}#chatter-widget.chatter-widget-hidden{display:none}#chatter-widget.chatter-widget-show{display:block}#chatter-widget.chatter-widget-open{width:350px;right:0px;bottom:0px}#chatter-widget.chatter-widget-collapsed{height:60px;width:100px;right:10px;bottom:20px}"
  // Parameters to setup
  CHATTER_APP_URL = "http://localhost:3000/";
  // Creating the iframe and adding appropiate attributes
  var chatterWidget = document.createElement("iframe");
  chatterWidget.id = "chatter-widget";
  // TODO: change to actual URL hosting chatter
  chatterWidget.src = CHATTER_APP_URL;
  chatterWidget.allowtransparency="true";
  chatterWidget.frameBorder = "0";
  chatterWidget.scrolling ="no";
  chatterWidget.className = "chatter-widget-hidden";
  // Append both the iframe tag and the styles tag to the body
  document.body.appendChild(chatterWidget);
  document.body.appendChild(s);
  // Global object containing the settings and the communication interface with the chatter app
  Chatter = {
    heightExpanded: window.innerHeight,
    expanded: false,
    // Hides the chatter widget making it invisible
    hide: function() {
      chatterWidget.className = "chatter-widget-hidden";
    },
    // Sends logout message to chatter app and hides the widget
    logout: function() {
      var data = {origin: "chatter-widget", message: "logout-chatter"}
      chatterWidget.contentWindow.postMessage(data, CHATTER_APP_URL);
      chatterWidget.className = "chatter-widget-hidden";
    },
    // Send credentials to the chatter app
    login: function() {
      if (Meteor.user()) {
        var username = Meteor.user().username;
        var data = {
          username: username,
          password: username,
          origin: "chatter-widget",
          message: "login-chatter"
        }
        chatterWidget.contentWindow.postMessage(data, CHATTER_APP_URL);
      } else {
        // TODO: find a smart way of checking again later if Meteor.user() is not loaded
        console.log("[WIDGET]: Meteor.user() has not loaded yet. Try again later?")
      }
    },
    // Makes the widget visible and iframe small and sends confimation message to chatter app
    minimize: function() {
      chatterWidget.className = "chatter-widget-show chatter-widget-collapsed";
      this.expanded = false;
      chatterWidget.removeAttribute("style");
      var data = {
        origin: "chatter-widget",
        message: "minimized-chatter"
      }
      chatterWidget.contentWindow.postMessage(data, CHATTER_APP_URL);
    },
    // Makes widget visible and iframes big and sends confimation message to chatter app
    expand: function() {
      chatterWidget.className = "chatter-widget-show chatter-widget-open";
      chatterWidget.style.height = this.heightExpanded + "px";
      this.expanded = true;
      var data = {
        origin: "chatter-widget",
        message: "expanded-chatter"
      }
      chatterWidget.contentWindow.postMessage(data, CHATTER_APP_URL);
    },
    // Makes the widget visible and iframe small
    show: function() {
      chatterWidget.className = "chatter-widget-show chatter-widget-collapsed";
    }
  };
  // Setting up message listener for multiple browsers
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  // Listens for messages received from chatter app and reacts accordingly
  eventer(messageEvent,function(e) {
    if (e.data.origin == "chatter-app") {
      console.log("[FROM: chatter TO: widget] => ", e.data);
      switch(e.data.message) {
        // If chatter app is loaded then send in the login credentials to the app
        case "chatter-loaded":
          Chatter.login();
          break;
        // Chatter widget can be displayed
        case "show-widget":
          Chatter.show();
          break;
        // Chatter widget can be minimized
        case "minimize-widget":
          Chatter.minimize();
          break;
        // Chatter widget can be hidden
        case "hide-widget":
          Chatter.hide();
          break;
        // Chatter widget can be expanded
        case "expand-widget":
          Chatter.expand();
          break;
      }
    }
  },false);
  // Detect when host page resizes its window and resize iframe accordingly
  window.onresize = function(event) {
    Chatter.heightExpanded = window.innerHeight;
    if (Chatter.expanded) {
      chatterWidget.style.height = window.innerHeight + "px";
    }
  };
  // Detect when pages unloads in order to send logout message to the chatter app.
  window.onbeforeunload = function(event) {
    console.log("[WIDGET]: Host Page is unmounting, sending log out message to CHATTER")
    Chatter.logout();
  }
```
The most elegant way to do so is to host the previous script as a static file and to inject the script asynchronously since you don’t want to slow down your client’s website in any way.

```html
<script>
  (function() {
    var d = document,
        h = d.getElementsByTagName('head')[0],
        s = d.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'PATH_TO_STATIC_CHATTER_SCRIPT';
    h.appendChild(s);
  } )();
</script>
```
