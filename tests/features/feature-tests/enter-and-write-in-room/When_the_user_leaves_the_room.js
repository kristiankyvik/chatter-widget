module.exports = function() {
  this.When(/^the user leaves the room$/, function () {
    browser.click(".menu .left .icon .chevron");
  });
};
