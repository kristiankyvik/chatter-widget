Feature: Chat widget
As a chatter user,
I want to be able to minify the chat window
to a small widget

Background:
  Given I am logged in and have a chatter user

Scenario: User enters room and views settings page
  When the user minifies the window
  Then chat window should be hidden and the widget shown
  When the user clicks on widget
  Then the chat window should reappear


