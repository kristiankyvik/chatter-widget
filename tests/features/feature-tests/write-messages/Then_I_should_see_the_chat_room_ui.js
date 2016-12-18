module.exports = function () {
  this.Then(/^I should see the chat room ui$/, function () {

    const doesExist = browser.waitForExist(".roomWrapper", 2000);
    expect(doesExist).toBe(true);
    expect(browser.getText(".header .status span")).toEqual("Test Room");
    const msgArray = ["message", "message", "message", "message", "message"];
    expect(browser.getText(".chatter-msg .text")).toEqual(msgArray);

    // check message written by my user
    const myNickname = browser.elements(".nickname").value[0].ELEMENT;
    const myAvatar = browser.elements("a.avatar").value[0].ELEMENT;

    expect(browser.elementIdCssProperty(myNickname, "visibility").value).toEqual("hidden");
    expect(browser.elementIdCssProperty(myAvatar, "display").value).toEqual("none");

    // check message written by other user
    const hisNickname = browser.elements(".nickname").value[3].ELEMENT;
    const hisAvatar = browser.elements("a.avatar").value[3].ELEMENT;

    expect(browser.elementIdText(hisNickname).value).toEqual("testuser2");
    expect(browser.elementIdCssProperty(hisAvatar, "display").value).toEqual("block");
  });
};
