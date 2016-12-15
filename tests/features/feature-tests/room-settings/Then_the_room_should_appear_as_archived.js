module.exports = function () {
  this.Then(/^the room should appear as archived$/, function () {
    const activeRooms = browser.elements(".active-rooms .roomListItem").value;
    const archivedRooms = browser.elements(".archived-rooms .roomListItem").value;
    expect(activeRooms.length).toEqual(0);
    expect(archivedRooms.length).toEqual(1);
  });
};
