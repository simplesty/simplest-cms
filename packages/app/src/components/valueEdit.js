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

const ValueEdit = props => {
  const classes = useStyles()

  const handleSubmit = values => {
    props.save(props.match.params.key, values).then(data => {
      props.history.push('/')
    })
  }

  const handleCancel = () => {
    props.history.push('/')
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
    fields: state.collections.items[props.match.params.key].fields,
    item: state.collections.items[props.match.params.key].data,
  }
}

const mapDispatchToProps = {
  save: actions.collections.saveValue,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValueEdit)
