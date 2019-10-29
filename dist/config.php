<?php

return [

  /*
  |--------------------------------------------------------------------------
  | Application Name
  |--------------------------------------------------------------------------
  |
  | This value is the name of your application. This value is used when the
  | framework needs to place the application's name in a notification or
  | any other location as required by the application or its packages.
  |
  */

  'name' => 'Simplest CMS',

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  |
  | Here you define username and password to edit the data
  |
  */

  "hash" => "",
  "username" => "admin",
  "password" => "admin",

  /*
  |--------------------------------------------------------------------------
  | Autosave
  |--------------------------------------------------------------------------
  |
  | If on each changes should save or not
  |
  */

  "autosave" => false,

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  |
  | Here some configuration for the HTTP header
  |
  */

  "header_allow_origin" => '*',

  /*
  |--------------------------------------------------------------------------
  | Schema
  |--------------------------------------------------------------------------
  |
  | Here you define the schema of your collections.
  | The data will be in 'data.json'
  |
  */

  "schema" => [
    "people" => [
      "firstname" => "text label(Your First Name)",
      "lastname" => "text not-required",
      "work" => "text"
    ],
    "@config" => [
      "title" => "text label(Title of the website) default(My Website)",
      "email" => "text",
    ]
  ]
];

?>