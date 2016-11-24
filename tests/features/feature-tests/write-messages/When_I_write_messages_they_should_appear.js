module.exports = function() {
  this.When(/^I write messages they should appear$/, function () {
    browser.setValue('#message', 'my new message');
    browser.keys("Enter");
    browser.pause(2000);

    // check last message written by me
    const lastMsg = browser.elements(".chatter-msg .content .text").value[5].ELEMENT;
    expect(browser.elementIdText(lastMsg).value).toEqual("my new message");
  });
};
