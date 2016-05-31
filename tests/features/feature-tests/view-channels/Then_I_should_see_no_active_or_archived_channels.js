module.exports = function() {
  this.Then(/^I should see no active or archived channels$/, function () {
    var elements = browser.elements(".roomListItem");
    expect(elements.value.length).toEqual(0);
  });
};
