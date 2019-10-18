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
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CollisionNavLink from './navlink'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}))

const Nav = props => {
  const classes = useStyles()

  const handleSaveAll = () => {
    const normalize = {}
    Object.keys(props.collections).forEach(key => {
      const collectionName = props.collections[key].name
      normalize[collectionName] = props.items[collectionName].data
    })
    console.log('NORMALIZE')
    console.log(JSON.stringify(normalize))

    // fetch(window.baseurl + '/index.php', {
    fetch('http://localhost:8001/api.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ colletions: normalize }),
    })
      .catch(error => console.log('Error:', error))
      .then(res => res.json())
      .then(result => {
        console.log('RESULT', result)
      })
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
        {props.collections.map(collection => (
          <ListItem
            button
            key={collection.name}
            to={`/collections/${collection.name}/`}
            component={CollisionNavLink}
          >
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={collection.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleSaveAll}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary="Save Changed" />
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

export default connect(mapStateToProps)(Nav)
