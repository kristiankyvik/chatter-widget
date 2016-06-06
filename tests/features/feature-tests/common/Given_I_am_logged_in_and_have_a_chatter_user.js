module.exports = function() {
  this.Before( function() {
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });
  });


  this.Given(/^I am logged in and have a chatter user$/, function () {
    server.execute( function() {
      Accounts.createUser({
        email : "kyvik_bcn@yahoo.es",
        password : "banana"
      });

      const meteorUser = Meteor.users.findOne();

      Chatter.User.insert({
        userId: meteorUser._id
      });
    });
    browser.url('http://localhost:3000');
    // server.call("createTestUser");
    browser.waitForExist("#login-sign-in-link", 2000);
    browser.click("#login-sign-in-link");
    browser.setValue("input[id='login-email'", "kyvik_bcn@yahoo.es");
    browser.setValue("input[id='login-password'", "banana");
    browser.click("#login-buttons-password");
  });
};
