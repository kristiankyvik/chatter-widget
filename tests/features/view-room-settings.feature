Feature: View room settings
As a chatter user,
so that I can view the settings of a room,
I want to be able to acces their settings.

Background:
  Given I am logged in and have a chatter user
  Given the chat is open
  Given I am in a room

Scenario: User visits the room settings
  When I click on the settings button
  Then I should see the room settings
  When I click on the archive button
  Then the room should appear as archived

