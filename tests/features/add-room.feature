@watch
Feature: Add room
As a chatter user,
so that I can interact with others,
I want to see the rooms I am added to.

Background:
  Given I am logged in and have a chatter user
  Given the chat is open

Scenario: User sees the room when he is invited
  Then I should see only one room
  When I am invited to a new room
  Then I should see the room on my list
