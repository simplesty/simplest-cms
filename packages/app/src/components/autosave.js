import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
}))

const AutoSave = () => {
  const [open, setOpen] = useState(false)
  const status = useSelector(state => state.app.status.store)
  const classes = useStyles()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  React.useEffect(() => {
    if (status.error) setOpen(true)
    if (status.saving) setOpen(false)
  }, [status.error, status.saving])

  return (
    <div className={classes.root}>
      {status.saving && <LinearProgress />}
      {open && <LinearProgress color="secondary" />}

      <Snackbar
        key="message-id"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        disableWindowBlurListener={false}
      >
        <SnackbarContent
          className={classes.error}
          message={<span id="message-id">{status.error && status.error.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  )
}

export default AutoSave
