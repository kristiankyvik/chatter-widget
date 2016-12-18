module.exports = function () {
  this.Then(/^I should see only one room$/, function () {
    expect(browser.waitForExist(".roomList", 2000)).toBe(true);
    const activeRooms = browser.elements(".active-rooms .roomListItem").value;
    expect(activeRooms.length).toEqual(1);
  });

  this.When(/^I am invited to a new room$/, function () {
    server.execute( function () {
      const newRoomId = Chatter.addRoom({
        name: "New Room",
        description: "this is a new room"
      });

      Chatter.addUserToRoom({
        userId: userIdOne,
        roomId: newRoomId
      });
    });
  });

  this.Then(/^I should see the room on my list$/, function () {
    browser.pause(2000);
    const activeRooms = browser.elements(".active-rooms .roomListItem").value;
    expect(activeRooms.length).toEqual(2);
  });
};
