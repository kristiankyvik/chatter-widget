module.exports = function () {
  this.Given(/^the user has a support user$/, function () {
    server.execute(function () {
      const cu1 = Meteor.users.findOne(userIdOne);
      const cu2 = Meteor.users.findOne(userIdTwo);

      Meteor.users.update(
        {_id: cu1._id},
        { $set: {
          "profile.supportUser": cu2.username
        }}
      );
    });
  });

  this.Then(/^I should see a help button$/, function () {
    const doesExist = browser.waitForExist(".ui.icon.primary.button", 2000);
    expect(doesExist).toBe(true);
  });

  this.When(/^I click on the help button$/, function () {
    browser.click(".ui.icon.primary.button");
  });

  this.Then(/^a support room should be created$/, function () {
    const doesExist = browser.waitForExist(".room", 2000);
    expect(doesExist).toBe(true);
    expect(browser.getText(".header .status span")).toEqual("Help");
  });

  this.Then(/^the support room button should not be there$/, function () {
    const doesExist = browser.waitForExist(".roomList", 2000);
    expect(doesExist).toBe(true);
    browser.pause(2000);
    const supportBtn = browser.elements(".ui.icon.primary.button").value.length;
    expect(supportBtn).toBe(0);
  });

  this.When(/^I return to the support room$/, function () {
    browser.click(".roomListItem");
  });

  this.Then(/^I should see the delete button$/, function () {
    const doesExist = browser.waitForExist(".negative.ui.button", 2000);
    expect(doesExist).toBe(true);
  });

  this.When(/^I click on the delete button$/, function () {
    browser.click(".negative.ui.button");
  });

  this.Then(/^the room should be deleted$/, function () {
    const doesExist = browser.waitForExist(".roomList", 2000);
    expect(doesExist).toBe(true);
  });

  this.Then(/^the support room button should be visible$/, function () {
    const doesExist = browser.waitForExist(".ui.icon.primary.button", 2000);
    expect(doesExist).toBe(true);
  });
};
