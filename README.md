# Chatter Embeddable Widget


## Configurtaton and setup

### API Calls
The pplication is hosted at http://localhost:3000 and all call to the API are to be made to this URL.

#### Methods

##### [POST] /setup
This is the main entry call to the api that allows you to configure the chat settings before embedding in on your website. A JSON must be sent in as the body of the request with the following format. This will specify users and the rooms desired. The usernames need to be unique and passwords are to be sent in.

```json
data = {
  "users": ["username1", "username2", "username3", "username4"],
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
  "username": "username1",
  "password"
}
```

##### [POST] /addRoom
This is the main entry call to the api that allows you to configure the chat settings before embedding in on your website. A JSON must be sent in as the body of the request with the following format. This will specify users and the rooms desired. The usernames need to be unique and passwords are to be sent in.

```json
data = {
  "users": ["username1", "username2", "username3", "username4"],
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

