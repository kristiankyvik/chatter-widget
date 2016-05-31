Feature: Archive a room
As a chatter user,
I want to be able to be able to enter a room,
and to archive it.

Background:
  Given I am logged in and have a chatter user
  And that I have been added to a room

Scenario: User archives a room
  When the user clicks on a room of the room list
  And the user archives a room
  Then the room should be archived


