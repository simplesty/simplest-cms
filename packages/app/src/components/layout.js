import React from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Menu from './menu'
import { pathnameToTitle } from '../share/helpers'

const drawerWidth = 200

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1,
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))

const Layout = props => {
  const location = useLocation()
  const classes = useStyles()

  const title = pathnameToTitle(location.pathname)

  return (
    <div className={classes.root}>
      <Menu />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{props.children}</div>
      </main>
    </div>
  )
}

export default Layout
