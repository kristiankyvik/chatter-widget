module.exports = function() {
  this.When(/^the user writes a message$/, function () {
    browser.setValue('textarea[name="message"]', "test message");
    client.keys("\uE007");
  });
};
