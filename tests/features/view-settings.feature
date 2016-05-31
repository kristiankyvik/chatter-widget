Feature: View room settings
As a chatter user,
I want to be able to be able to enter a room,
and to view its settings page.

Background:
  Given I am logged in and have a chatter user
  And that I have been added to a room

Scenario: User enters room and views settings page
  When the user clicks on a room of the room list
  And enters the settings page
  Then the user should be presented with the settings page


