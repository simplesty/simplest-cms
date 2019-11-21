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
 * https://github.com/simplest-cms/simplest-cms/issues
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *   /!\ DO NOT MODIFY THIS FILE /!\
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

/*-----------------------------------------------------------------------------
| Constants
|-----------------------------------------------------------------------------*/

const BACKEND_VERSION = '1.2.2';
const ACTION_NONE = 'none';
const ACTION_AUTH_FAILURE = 'auth';
const ACTION_LOGOUT = 'logout';
const ACTION_LOGGED = 'logged';
const ACTION_STORE = 'store';
const ACTION_DATA = 'data';
const ACTION_GENERATE = 'generate-password';

/*-----------------------------------------------------------------------------
| Get config information
|-----------------------------------------------------------------------------*/

if(file_exists('config.php'))
  $config = include('config.php');
else {
  $config = [
    'name' => 'Simplest CMS',
    "hash" => false,
    "username" => "admin",
    "password" => "admin",
    "schema" => [
      "people" => [
        "firstname" => "text required",
        "lastname" => "text",
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

function verifyUsername() {
  global $config;
  return $_POST['username'] === $config['username'];
}

function verifyPassword() {
  global $config;
  if(hasHash()) {
   return password_verify($_POST['password'], $config['password']);
  }
  return $_POST['password'] === $config['password'];
}

function verifCredential() {
  global $config;
  $isAuth = false;
  $_SESSION['loggedin'] = false;

  if(isset($_POST['username']) && isset($_POST['password'])) {
    if(verifyUsername() && verifyPassword()) {
      $_SESSION['loggedin'] = true;
      $isAuth = true;
    }
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

  if($_SESSION['loggedin'] === true) {
    $status = ACTION_LOGGED;
  }

  if(isset($_GET['logout']) || isset($_POST['logout'])) {
    $status = ACTION_LOGOUT;
  }

  if ($contentType === "application/json") {
    $status = ACTION_STORE;
  }

  if(isset($_GET['data'])) {
    $status = ACTION_DATA;
  }

  if(isset($_GET['generate'])) {
    $status = ACTION_GENERATE;
  }

  return $status;
}

function getCurrentDiretory() {
  $protocol = $_SERVER["HTTPS"] == "on" ? "https://" : "http://";
  return $protocol . $_SERVER['HTTP_HOST'] . substr(dirname(__FILE__), strlen($_SERVER['DOCUMENT_ROOT']));
}

function style() {
  return <<<EOD
  body { font-family: "Source Serif Pro", sans-serif; }
  form { border: 1px solid #ccc; padding: 16px; box-shadow: 0px 3px 2px #ececec; }
  input { display: block; margin: 6px 0 15px 0; padding: 6px; width: 100%; box-sizing: border-box;}
  button { padding: 5px 12px; }
  a { display: block; font-size: 0.8em; color: #525252; margin-top: 16px;}
  .center { display: flex; align-items: center; justify-content: center; height: 100vh; }
  .wrapper { width: 100%;  max-width: 250px }
  .alert { font-size: 0.8em; margin: 4px 0 12px; background-color: #fff3cd; padding: 8px; color: #856404; border: 1px solid #f9e5a7;}
EOD;
}

function hasHash() {
  global $config;
  return strtolower($config['hash']) === 'true' || $config['hash'] === true;
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
  case ACTION_DATA:
    getData();
    break;
  case ACTION_GENERATE:
    viewGenerateForm();
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
  $alert = $error ? "<div class='alert'>$error</div>" : "";
  $hasHash = hasHash();
  $style = style();
  $showGenerateLink = $hasHash ? '<a href="?generate">Generate password using hash</a>' : '';

  echo <<<EOD
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/><link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>$title</title>
        <style>
          $style
        </style>
      </head>
      <body class="center">
        <div class="wrapper">
          <h2>Login</h2>
          <form action="$baseurl" method="post">
            <label>
              Username:
              <input placeholder="username" name="username" type="text" autocomplete="off">
            </label>
            <label>
              Password:
              <input placeholder="password" name="password" type="password">
            </label>
            {$alert}
            <button type="submit">Log in</button>
          </form>
          $showGenerateLink
        </div>
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
    "version" => BACKEND_VERSION,
    "name" => $config['name'],
    "datafile" =>  "data.json",
    "autosave" => $config['autosave'],
    "loggedin" => $_SESSION['loggedin'],
  ]);

  $schema = json_encode($config['schema']);
  $bundle = isset($config['app_src']) ? $config['app_src'] : './bundle.js';

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
          window.schema = $schema;
          window.config = $appconfig;
        </script>
        <script src="$bundle"></script>
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

/*----------------------------------------------------------------------------
| Get / Data.json
|----------------------------------------------------------------------------*/

function getData () {
  header('Content-type: application/json');
  $data = json_decode(file_get_contents("data.json"), true);
  echo json_encode($data);
  exit(0);
}

/*----------------------------------------------------------------------------
| View / Generate Password
|----------------------------------------------------------------------------*/

function viewGenerateForm () {
  global $config;
  $baseurl = getCurrentDiretory();
  $title = $config['name'];
  $style = style();
  $width = '250px';
  $alert = "";
  $pw = $_POST['generate'];
  $newPw = false;
  if(trim($pw) !== '') {
    $newPw = password_hash($pw, PASSWORD_DEFAULT);
    $alert = "<div class='alert'>$newPw</div>";
    $width = '500px';
  }

  echo <<<EOD
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/><link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>$title</title>
        <style>
          $style
          .wrapper { max-width: $width }
        </style>
      </head>
      <body class="center">
        <div class="wrapper">
          <h2>Generate Password with Hash</h2>
          <form action="" method="post">
            <label>
              Password:
              <input placeholder="password" name="generate" type="password">
            </label>
            {$alert}
            <button type="submit">Generate</button>
          </form>
          <a href="?">Login page</a>
        </div>
      </body>
    </html>
EOD;

  exit(0);
}

?>