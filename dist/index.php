<?php session_start();
/**
 * Copyright (c) 2019-present,
 * Ricardo Canelas https://github.com/ricardocanelas
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *   /!\ DO NOT MODIFY THIS FILE /!\
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * Check the documentation how to upgrade
 *
 * Also be careful with new language features.
 * This file must work on PHP 5.4+
 *
 * If you find any issues, please report them here:
 * https://github.com/ricardocanelas/simplest-cms/issues
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *   /!\ DO NOT MODIFY THIS FILE /!\
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*-----------------------------------------------------------------------------
| Constants
|-----------------------------------------------------------------------------*/

const VERSION = '0.1.2';
const ACTION_NONE = 'none';
const ACTION_AUTH_FAILURE = 'auth';
const ACTION_LOGOUT = 'logout';
const ACTION_LOGGED = 'logged';
const ACTION_STORE = 'store';

/*-----------------------------------------------------------------------------
| Get config information
|-----------------------------------------------------------------------------*/

if(file_exists('config.php'))
  $config = include('config.php');
else {
  $config = [
    'name' => 'Simplest CMS',
    "hash" => "",
    "username" => "admin", // =TODO in hash
    "password" => "admin", // =TODO in hash, password_hash
    "collections" => [
      "people" => [
        "firstname" => "text",
        "lastname" => "text not-required",
        "work" => "text"
      ],
    ]
  ];
}

/*-----------------------------------------------------------------------------
| Set HTTP Headers
|-----------------------------------------------------------------------------*/

$allow_origin = isset($config['header_allow_origin']) ? $config['header_allow_origin'] : '*';

header('Access-Control-Allow-Origin: ' . $allow_origin);
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

/*-----------------------------------------------------------------------------
| Helper Functions
|-----------------------------------------------------------------------------*/

function verifCredential() {
  global $config;
  $isAuth = false;
  $_SESSION['loggedin'] = false;

  if(isset($_POST['username']) &&
    isset($_POST['password']) &&
    $_POST['username'] === $config['username'] &&
    $_POST['password'] === $config['password']
  ) {
    $_SESSION['loggedin'] = true;
    $isAuth = true;
  }
  return $isAuth;
}

function getAction() {
  $status = ACTION_NONE;
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if(isset($_POST['username']) || isset($_POST['password'])) {
    $status = ACTION_AUTH_FAILURE;
    verifCredential();
  }

  if(isset($_GET['logout']) || isset($_POST['logout'])) {
    $status = ACTION_LOGOUT;
  }

  if($_SESSION['loggedin'] === true) {
    $status = ACTION_LOGGED;
  }

  if ($contentType === "application/json") {
    $status = ACTION_STORE;
  }

  return $status;
}

function getCurrentDiretory() {
  $protocol = $_SERVER["HTTPS"] == "on" ? "https://" : "http://";
  return $protocol . $_SERVER['HTTP_HOST'] . substr(dirname(__FILE__), strlen($_SERVER['DOCUMENT_ROOT']));
}

/*----------------------------------------------------------------------------
| Router
|----------------------------------------------------------------------------*/

switch (getAction()) {
  case ACTION_NONE:
    viewAuthForm();
    break;
  case ACTION_AUTH_FAILURE:
    viewAuthForm('Your credential is not correct.');
    break;
  case ACTION_LOGOUT:
    $_SESSION['loggedin'] = false;
    viewAuthForm();
    break;
  case ACTION_LOGGED:
    viewApp();
    break;
  case ACTION_STORE:
    storeUpdateData();
    break;
  default:
    echo "¯\_(ツ)_/¯";
    break;
}

/*----------------------------------------------------------------------------
| View / Auth Form
|----------------------------------------------------------------------------*/

function viewAuthForm ($error = false) {
  global $config;
  $baseurl = getCurrentDiretory();
  $title = $config['name'];
  $alert = $error ? "<div>$error</div>" : "";

  echo <<<EOD
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/><link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>$title</title>
      </head>
      <body>
        {$alert}
        <form action="" method="post">
          <label>
            Username:
            <input placeholder="username" name="username" type="text">
          </label>
          <label>
            Password:
            <input placeholder="password" name="password" type="password">
          </label>
          <button type="submit">Log in</button>
        </form>
      </body>
    </html>
EOD;

  exit(0);
}

/*----------------------------------------------------------------------------
| View / App
|----------------------------------------------------------------------------*/

function viewApp () {
  global $config;
  $baseurl = getCurrentDiretory();
  $title = $config['name'];
  $appconfig = json_encode([
    "version" => VERSION,
    "name" => $config['name'],
    "datafile" =>  "data.json",
    "autosave" => $config['autosave'],
    "loggedin" => $_SESSION['loggedin'],
  ]);

  $collections = json_encode($config['collections']);

  echo <<<EOD
    <!doctype html>
    <html lang="en"><head>
      <meta charset="utf-8"/><link rel="icon" href="/favicon.ico"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title>$title</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div>
        <script>
          window.baseurl = "$baseurl";
          window.collections = $collections;
          window.config = '$appconfig';
        </script>
        <script src="./bundle.js"></script>
      </body>
    </html>
EOD;

  exit(0);
}


/*----------------------------------------------------------------------------
| Store / Updating data.json
|----------------------------------------------------------------------------*/

function storeNoLogged() {
  echo json_encode([ "status" => "error", "message" => "You are not log in.", "code" => "no-loggedin" ]);
  exit(0);
}

function storeUpdateData() {
  header('Content-type: application/json');
  if(!$_SESSION['loggedin']) return storeNoLogged();

  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));
  $decoded = json_decode($content, true);

  // If json_decode failed, the JSON is invalid.
  if(! is_array($decoded)) {
    echo json_encode([ "status" => "error", "message" => "the JSON is invalid.",  "code" => "is-not-array" ]);
    exit(0);
  }

  // Saving...
  $posts = ["data" => $decoded];
  $json_indented_by_4 = json_encode($posts, JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
  $json_indented_by_2 = preg_replace('/^(  +?)\\1(?=[^ ])/m', '$1', $json_indented_by_4);
  file_put_contents('data.json', $json_indented_by_2);

  echo json_encode([ "status" => "ok", "message" => "Has saved with success!", "code" => "success" ]);
  exit(0);
}

?>