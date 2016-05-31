module.exports = function() {
  this.Given(/^that I have been added to a room$/, function () {
    server.call("createTestRoom");
  });
};
