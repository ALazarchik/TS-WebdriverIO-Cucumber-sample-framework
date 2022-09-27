@all @startPage
Feature: WebdriverIO start page

  Scenario: User should be able to open Start page and see enabled navigation bar toggle button
    When User goes to the start page
    Then User sees that "Start Page" is displayed
    And User sees that "home" link is displayed on "Start Page" at this moment