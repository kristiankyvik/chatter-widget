Feature: Admin creates a room
As a chatter admin,
I want to be able to create a room.

Background:
  Given I am logged in and have a chatter admin user

Scenario: Admin creates a room
  When admin clicks on new room
  Then he can submit information
  And add users
  And the room is created
