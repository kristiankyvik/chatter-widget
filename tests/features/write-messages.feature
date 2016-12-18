@watch
Feature: Write messages
As a chatter user,
so that I can get communicate with others,
I want to be able to write messages.

Background:
  Given I am logged in and have a chatter user
  Given some messages have been written
  Given the chat is open
  Given I am in a room

Scenario: User writes messages in the room
  Then I should see the chat room ui
  When I write messages they should appear
  And when I go back to the room list
  Then I should see my message and my avatar
