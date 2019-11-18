import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import LabelIcon from '@material-ui/icons/Label'
import SaveIcon from '@material-ui/icons/Save'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import NavLinkMui from './navlinkMui'
import SaveModal from './saveModal'

const drawerWidth = 200

const useStyles = makeStyles(theme => ({
  drawer: {
    zIndex: 1,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const Menu = props => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleLogout = () => {
    window.location.href = window.baseurl + '?logout'
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <SaveModal open={open} setOpen={setOpen} />

      <div className={classes.toolbar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              Simplest CMS
            </Link>
          </Typography>
        </Toolbar>
      </div>
      <Divider />
      <List>
        {props.collections.map(item => (
          <ListItem
            button
            key={item.name}
            to={`${item.isCollection ? '/collections' : '/values'}/${item.name}/`}
            component={NavLinkMui}
            activeStyle={{
              fontWeight: 'bold',
              color: '#000',
              backgroundColor: '#dbdbdb',
            }}
          >
            <ListItemIcon style={{ minWidth: 24 }}>
              <LabelIcon style={{ width: 16 }} />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {!window.config.autosave && (
          <ListItem button onClick={handleOpen}>
            <ListItemIcon style={{ minWidth: 24 }}>
              <SaveIcon style={{ width: 16 }} />
            </ListItemIcon>
            <ListItemText primary="Save All Changed" />
          </ListItem>
        )}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon style={{ minWidth: 24 }}>
            <LogoutIcon style={{ width: 16 }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  )
}

const mapStateToProps = state => {
  return {
    collections: state.collections.names,
    items: state.collections.items,
  }
}

export default connect(mapStateToProps)(Menu)
