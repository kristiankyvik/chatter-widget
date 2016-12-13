String.prototype.startsWith = function (needle) {
    return(this.indexOf(needle) === 0);
};

module.exports = function () {
  this.Then(/^I should see my message and my avatar$/, function () {
    expect(browser.getText(".active-rooms .roomListItem .description .preview")).toEqual("my new message");

    // user avatar being valid svg (better way of testing this?)
    const avatar = browser.elements(".active-rooms .roomListItem .ui.avatar.image").value[0].ELEMENT;
    // expect(browser.elementIdCssProperty(avatar, "src").value.startsWith("data:image/png;base64")).toEqual(true);

    // status circle being green
    const status = browser.elements(".active-rooms .roomListItem .user-status").value[0].ELEMENT;
    expect(browser.elementIdCssProperty(status, "background-color").value).toEqual("rgba(134, 187, 113, 1)");

    expect(browser.getText(".active-rooms .roomListItem .description .preview")).toEqual("my new message");
    expect(browser.getText(".active-rooms .roomListItem .header .meta")).toEqual("a few seconds ago");
  });
};
