import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import actions from '../redux/actions'
import { useDispatch } from 'react-redux'

const SaveModal = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const status = error ? 'error' : saved ? 'saved' : 'saving'

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      dispatch(actions.collections.saveInJson())
        .then(result => {
          if (result.status === 'ok') {
            setSaved(true)
            setError(null)
          }
          if (result.status === 'error') {
            console.log(result)
            setSaved(false)
            setError(result)
          }
        })
        .catch(err => {
          setSaved(false)
          setError(err)
        })
    }
  }, [dispatch, open])

  return (
    <div>
      <Dialog
        open={open}
        onClose={null}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {status === 'saving' && 'Saving data'}
          {status === 'saved' && 'Saved data'}
          {status === 'error' && 'Error'}
        </DialogTitle>
        <DialogContent style={{ minWidth: 300 }}>
          {status === 'saving' && (
            <>
              <CircularProgress size={14} thickness={4} style={{ marginRight: 16 }} />
              <DialogContentText id="alert-dialog-description">Wait a moment...</DialogContentText>
            </>
          )}
          {status === 'saved' && (
            <>
              <DialogContentText id="alert-dialog-description">
                Saved with success
              </DialogContentText>
            </>
          )}
          {status === 'error' && (
            <>
              <DialogContentText id="alert-dialog-description">
                {error.code === 'no-loggedin' && (
                  <>
                    <span>You are not log in.</span>
                    <br />
                    <br />
                    <span style={{ fontSize: 13 }}>
                      <b>Maybe you will lose the data that you has changed.</b>
                      <br />A solution: open a new window, sign in there, and come back <br /> on
                      this window and try again.
                    </span>
                  </>
                )}
                {error && error.code !== 'no-loggedin' && (
                  <p>
                    {error.message}
                    <br />
                    Close this modal and try again.
                  </p>
                )}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={status === 'saving'}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SaveModal

// const mapDispatchToProps = {
//   saveInJson: actions.collections.saveInJson,
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(saveModal)
