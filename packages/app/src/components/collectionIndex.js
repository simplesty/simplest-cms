import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import isBoolean from 'lodash/isBoolean'
import actions from '../redux/actions'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  addbutton: {
    marginBottom: 16,
  },
  table: {
    minWidth: 450,
  },
  buttons: {
    padding: '3px 6px',
    minWidth: 'auto',
    fontSize: '0.6rem',
  },
  cell: {
    actions: {
      width: 150,
      minWidth: 145,
      root: {
        width: 150,
        minWidth: 145,
      },
    },
  },
})

const CollectionIndex = props => {
  const classes = useStyles()

  const gotoCreatePage = () => {
    props.history.push('/collections/' + props.match.params.collection + '/new')
  }
  const handleDelete = item => () => {
    props.delete(props.match.params.collection, item._uid)
  }

  return (
    <div>
      <Button variant="outlined" onClick={gotoCreatePage} className={classes.addbutton}>
        add +
      </Button>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UID</TableCell>
              {props.collection.fields.map(field => {
                return <TableCell key={field.name}>{field.name}</TableCell>
              })}
              <TableCell align="right" style={{ minWidth: 130 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(props.collection.data).map(key => {
              const item = props.collection.data[key]
              return (
                <TableRow key={item._uid}>
                  <TableCell component="th" scope="row">
                    {item['_uid']}
                  </TableCell>

                  {props.collection.fields.map(field => {
                    const value = isBoolean(item[field.name])
                      ? item[field.name]
                        ? 'true'
                        : 'false'
                      : item[field.name]
                    return (
                      <TableCell key={field.name} component="th" scope="row">
                        {value}
                      </TableCell>
                    )
                  })}

                  <TableCell align="right" className={classes.cell.actions}>
                    <Button
                      size="small"
                      variant="outlined"
                      to={`/collections/${props.match.params.collection}/${item._uid}`}
                      component={Link}
                      style={{ marginRight: 6 }}
                      className={classes.buttons}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      className={classes.buttons}
                      onClick={handleDelete(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    collection: state.collections.items[props.match.params.collection],
  }
}

const mapDispatchToProps = {
  delete: actions.collections.delete,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionIndex)
