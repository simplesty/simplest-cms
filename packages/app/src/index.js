import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './app'
import './style.css'

window.baseurl = window.baseurl || 'http://localhost:3000'
window.collections = window.collections || null

if (window.collections === null) {
  ReactDOM.render(
    <div>Please, include the collections configuration</div>,
    document.getElementById('root')
  )
} else {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}
