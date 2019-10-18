import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './app'

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
      <CssBaseline />
      <App />
    </Provider>,
    document.getElementById('root')
  )
}
