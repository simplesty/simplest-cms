import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import actions from '../redux/actions'
import Form from './form'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding: 16,
  },
})

const CollectionNew = props => {
  const classes = useStyles()

  const handleSubmit = values => {
    props.save(props.match.params.collection, { ...values, _uid: +new Date() }).then(() => {
      props.history.push('/collections/' + props.match.params.collection)
    })
  }

  const handleCancel = () => {
    props.history.push('/collections/' + props.match.params.collection)
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Form
          fields={props.fields}
          initValues={props.item}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Paper>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    fields: state.collections.items[props.match.params.collection].fields,
    item: state.collections.items[props.match.params.collection].data[props.match.params.uid],
  }
}

const mapDispatchToProps = {
  save: actions.collections.save,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionNew)
