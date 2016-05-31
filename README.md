# Chatter Embeddable Widget


## Configurtaton and setup

### API Calls
The pplication is hosted at http://localhost:3000 and all call to the API are to be made to this URL.

#### Methods

##### [POST] /setup
This is the main entry call to the api that allows you to configure the chat settings before embedding in on your website. A JSON must be sent in as the body of the request with the following format. This will specify users and the rooms desired. The usernames need to be unique and passwords are to be sent in.

```json
data = {
  "users": [
    {
      "username": "username1",
      "password": "password1"
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
data = {
  "username": "username",
  "password": "password"
}
```

##### [POST] /addRoom
Adds a room to chatter. Returns id of the room.

```json
data = {
  "name": "username",
  "description": "password"
}
```

##### [POST] /addUserToRoom
Adds a room to chatter. Returns id of the room.

```json
data = {
  "userId": "324kj23l40o",
  "roomId": "d9saf8df9sa"
}
```
### Ebbedable snippet

In order to add the chat instance to your website you a small snippet of javascript will need to be added to your source code.

```javascript
(function() {
  var loaded = false;
  document.addEventListener("DOMContentLoaded", function(event) {
    var iframe = document.createElement('iframe');
    iframe.id = "chatter-widget";
    iframe.src = 'http://localhost:3000/';
    iframe.allowtransparency="true";
    iframe.frameborder = "0";
    iframe.width = 350;
    iframe.style.position = "absolute";
    iframe.height = "100%";
    iframe.style.right = "0";
    iframe.style.top = "0";
    iframe.style.bottom = "0";
    document.body.appendChild(iframe);
  });
})();
```
This will add the chat widget in the form of an iframe in your site's DOM. In order to interact with the widget, and for example login/logout users, the following hooks are to be used.

#### Login a user

```javascript
  var data = {
    username: groupName,
    password: groupName,
    origin: "chatter-parent",
    command: "login"
  };
  document.getElementById("chatter-widget").contentWindow.postMessage(data, '*');
```

#### Login a user
```javasscript
  var data = {
    origin: "chatter-parent",
    command: "logoff"
  };
  document.getElementById("chatter-widget").contentWindow.postMessage(data, '*');
```


