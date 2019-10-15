<?php

if(file_exists('config.php'))
  include 'config.php';
else {
  $config = [
    "username" => "admin", // =TODO in hash
    "password" => "admin", // =TODO in hash, password_hash
    "data" => "data-[collection].json",
    "structure" => "data-structure.yaml",
    "backup" => "7", // each 7 days
  ];
}

$config = (object) $config;

session_start();

// =TODO use password_verify
if(isset($_POST['username']) || isset($_POST['password'])) {
  $_SESSION['loggedin'] = FALSE;
  if(isset($_POST['username']) && isset($_POST['password']) &&
    $_POST['username'] === $CONFIG->username && $_POST['password'] === $CONFIG->password
  ) {
    $_SESSION['loggedin'] = TRUE;
  }
}

if(isset($_POST['data']) && isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
  $jsondata = json_encode($_POST['data'], JSON_PRETTY_PRINT);
  if(file_put_contents($CONFIG->filename, $jsondata)) {
    echo 'Data successfully saved';
  }
}

$_SESSION['loggedin'] = TRUE; // =todo for test
if(isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
  echo '
    <!doctype html>
    <html lang="en">
      <head><meta charset="utf-8"/>
      <link rel="icon" href="build//favicon.ico"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <meta name="theme-color" content="#000000"/>
      <meta name="description" content="Web site created using create-react-app"/>
      <link rel="apple-touch-icon" href="build/logo192.png"/>
      <link rel="manifest" href="build/manifest.json"/>
      <title>React App</title>
      <link href="build/static/css/main.34de6062.chunk.css" rel="stylesheet">
      </head>
      <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
      <script>!function(i){function e(e){for(var t,r,n=e[0],o=e[1],u=e[2],p=0,l=[];p<n.length;p++)r=n[p],Object.prototype.hasOwnProperty.call(f,r)&&f[r]&&l.push(f[r][0]),f[r]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(i[t]=o[t]);for(s&&s(e);l.length;)l.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var r=c[t],n=!0,o=1;o<r.length;o++){var u=r[o];0!==f[u]&&(n=!1)}n&&(c.splice(t--,1),e=p(p.s=r[0]))}return e}var r={},f={1:0},c=[];function p(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.m=i,p.c=r,p.d=function(e,t,r){p.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(t,e){if(1&e&&(t=p(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(p.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)p.d(r,n,function(e){return t[e]}.bind(null,n));return r},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="/";var t=this["webpackJsonp@simplest-cms/app"]=this["webpackJsonp@simplest-cms/app"]||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var s=n;a()}([])</script>
      <script src="build/static/js/2.c118ede5.chunk.js"></script>
      <script src="build/static/js/main.4bfecff1.chunk.js"></script>
      </body>
    </html>';
} else {
  echo 'please! log in';
  print_r($_SESSION['loggedin']);
}

?>