import React, { useMemo } from 'react'
import { FormContext, useFormContext } from 'react-hook-form'
import useForm from 'react-hook-form'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Field from './fields'
import Validation from '../share/validation'

export const ConnectForm = ({ children }) => {
  const methods = useFormContext()

  return children({
    ...methods,
  })
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

const Form = ({ fields, initValues, onSubmit, onCancel }) => {
  const schema = useMemo(() => Validation.getSchema(fields), [fields])
  const methods = useForm({ validationSchema: schema })
  const classes = useStyles()

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={classes.container}>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Field key={index} defaultValue={initValues && initValues[field.name]} info={field} />
          ))}

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="outlined" color="primary" style={{ marginRight: 10 }}>
              Save
            </Button>
            <Button type="button" variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContext>
  )
}

export default Form
