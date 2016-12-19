@watch
Feature: Fetch old messages
As a chatter user,
so that I can see old messages,
I want them to load when scrolling up.

Background:
  Given I am logged in and have a chatter user
  Given I have many old messages
  Given the chat is open
  Given I am in a room

Scenario: User can load older messages
  Then I should see only the recent messages
  When I scroll up
  Then I should see older messages
