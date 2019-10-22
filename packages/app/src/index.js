import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import store from './redux/store'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './share/theme'
import App from './app'

window.baseurl = window.baseurl || 'http://localhost:3000'
window.collections = window.collections || null

if (window.collections === null) {
  ReactDOM.render(
    <div>Please, include the collections configuration.</div>,
    document.getElementById('root')
  )
} else {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  )
}
