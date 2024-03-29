## 1.6.0 (2019-11-19)

#### :rocket: New Feature

- Optimize final bundle.js (1.33 MB to 630KB)

## 1.5.0 (2019-11-18)

#### :rocket: New Feature

- New types: one and many

#### :house: Internal

- improve the select compoent to accept multiple selects
- add tests: one and many info
- update example-dev data

## 1.4.0 (2019-11-18)

#### :rocket: New Feature

- New types: date and datetime

#### :house: Internal

- update screencast
- update example
- add tests: date and datetime info
- decrease the menu width
- display boolean value on the list page
- add dependencies:
  - @data-io/date-fns 1.3.11
  - @material-ui/pickers 3.2.8
  - date-fns 2.7.0
- update dependencies:
  - react and react-dom 16.12
  - formik 2.0.4
  - react-redux 7.1.3
- update backend file to v1.2.1
  - fix remove debug message
  - fix logout and login redirection
  - fix config value

## 1.3.0 (2019-11-16)

#### :rocket: New Feature

- New type: checkbox
- Sytled the login form
- Generate and verify hash password
- Add a logout button

#### :house: Internal

- add function: stringToBoolean
- add tests: stringToBoolean, checkbox,
- update material-ui dependency to v4.6.1
- add docker-compose: php 5.5
- update backend file to v1.2
  - add style to forms
  - add hash functionality
  - remove double quotes in the config file
  - small improvements
  - fix logout functionality
- fix: when default value is a boolean value

## 1.2.0 (2019-11-02)

#### :rocket: New Feature

- New types: textarea and select

#### :house: Internal

- remove react-hooks-form
- add formik
- change the form and fields to use formik
- separe the fields in a file
- improve Info class
  - getComponentName
  - getComponentArgs
  - addError

## 1.1.0 (2019-10-29)

#### :rocket: New Feature

- Now you can create schema that don't be necessary a collection, using the prefix '@'

#### :house: Internal

- improve the menu
- add valueEdit component
- add new type: values_item_save
- add new action: savevalue
- improve structure
- improve backend to get data.json

#### :memo: Documentation

- improve the section 'api/schema'

## 1.0.0 (2019-10-27)

#### :rocket: New Feature

- Funcionality: label, default, description were added

#### :house: Internal

- able to use extract args in the schema
- add class Info to help extract information of each field
- use lodash dependency

#### :boom: Breaking Change

- the 'collections' key in config file has changed to 'schema'

#### :memo: Documentation

- add a screencast image
- improve the section 'how to install'
