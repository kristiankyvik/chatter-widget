@watch
Feature: Create help room
As a chatter user,
so that I can get help,
I want to be able to summon a help room.

Background:
  Given I am logged in and have a chatter user
  Given the chat is open
  Given the user has a support user

Scenario: User can create a support room
  Then I should see a help button
  When I click on the help button
  Then a support room should be created
  When I go back to the room list
  Then the support room button should not be there
  When I return to the support room
  When I click on the settings button
  Then I should see the delete button
  When I click on the delete button
  Then the room should be deleted
  And the support room button should be visible
