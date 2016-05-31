Feature: View channels
As a chatter user,
so that I can get interact with the chat,
I want to be able to see the chat widget.

Background:
  Given I am logged in and have a chatter user

Scenario: User visits a room
  Then I should see the chat widget
  And I should see no active or archived channels
