import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <App />,
  document.getElementById("root")
);
