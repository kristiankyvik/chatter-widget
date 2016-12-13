@watch
Feature: View Settings
As a chatter user,
so that I can see my information,
I want to be able to view the settings.

Background:
  Given I am logged in and have a chatter user
  Given the chat is open

Scenario: User goes to the settings page
  Then I should see my settings
  When I click on close I should see the rooms

