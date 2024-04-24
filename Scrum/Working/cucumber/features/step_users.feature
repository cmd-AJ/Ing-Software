Feature: Get Users from the Database
  In order to manage users
  As an app admin
  I want to retrieve users from the database

  Scenario: Fetch all users
    When I fetch all users from the database
    Then I should get a list of users