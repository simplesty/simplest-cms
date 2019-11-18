import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import store from './redux/store'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import theme from './share/theme'
import App from './app'

window.baseurl = window.baseurl || 'http://localhost:3000'
window.schema = window.schema || null

if (window.schema === null) {
  ReactDOM.render(
    <div>Please, include the schema configuration.</div>,
    document.getElementById('root')
  )
} else {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <App />
        </MuiPickersUtilsProvider>
      </Provider>
    </ThemeProvider>,
    document.getElementById('root')
  )
}
