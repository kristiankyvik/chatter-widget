const callbackWrapper = function (fn) {
  return function (error, response) {
    setTimeout(() => fn(error, response));
  };
};

const emptyDatabase = function () {
  Chatter.UserRoom.remove({});
  Chatter.Room.remove({});
  Chatter.Message.remove({});
  Meteor.users.remove({});
};

export {emptyDatabase, callbackWrapper};
