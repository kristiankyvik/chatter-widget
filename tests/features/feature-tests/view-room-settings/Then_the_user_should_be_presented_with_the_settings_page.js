module.exports = function() {
  this.Then(/^the user should be presented with the settings page$/, function () {
    expect(browser.waitForExist(".settings")).toBe(true);
    expect(browser.getText(".settings .room-description")).toBe("This is the description of the test room");
    expect(browser.getText(".menu .header .status span")).toBe("Channel settings");
    expect(browser.getText(".room-users .room-user .last-active")).toBe("Last logged in just now.");
    expect(browser.getText(".room-users .room-user .nickname")).toBe("kyvik_bcn@yahoo.es");
  });
};
