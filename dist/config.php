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
  | !ATTENTION!
  | If 'hash' is true then...
  |  * you need to use php version >= 5.5
  |  * go to: index.php?generate
  */

  'hash' => false,
  'username' => 'admin',
  'password' => 'admin',

  /*
  |--------------------------------------------------------------------------
  | Autosave
  |--------------------------------------------------------------------------
  |
  | If on each changes should save or not
  |
  */

  'autosave' => true,

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  |
  | Here some configuration for the HTTP header
  |
  */

  'header_allow_origin' => '*',

  /*
  |--------------------------------------------------------------------------
  | Schema
  |--------------------------------------------------------------------------
  |
  | Here you define the schema of your collections.
  | The data will be in 'data.json'
  |
  */

  'schema' => [
    'posts' => [
      'title' => 'text required',
      'body' => 'textarea',
      'category' => 'select(article, project, experimental, talk, code)',
      'featured' => 'checkbox default(1)'
    ],
    '@config' => [
      'title' => 'text default(Inc Company)',
      'email' => 'text default(myemail@domain.com)',
    ],
  ]
];

?>