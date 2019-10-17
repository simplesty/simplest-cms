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
  | CREDENTIALS
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
  | HEADER
  |--------------------------------------------------------------------------
  |
  | Here you define the schema of your collections.
  | The data will be in 'data.json'
  |
  */

  "header_allow_origin" => '*',

  /*
  |--------------------------------------------------------------------------
  | COLLECTIONS
  |--------------------------------------------------------------------------
  |
  | Here you define the schema of your collections.
  | The data will be in 'data.json'
  |
  */

  "collections" => [
    "people" => [
      "firstname" => "string",
      "lastname" => "string not-required",
      "work" => "string"
    ],
  ]
];

?>