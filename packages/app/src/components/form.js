import React from 'react'
import { FormContext, useFormContext } from 'react-hook-form'
import useForm from 'react-hook-form'
import Field from './fields'
import * as yup from 'yup'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
})

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
  const methods = useForm({ validationSchema: schema })
  const classes = useStyles()

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={classes.container}>
        {fields.map((field, index) => (
          <Field key={index} defaultValue={initValues && initValues[field.name]} info={field} />
        ))}

        <Button type="submit" variant="outlined" color="primary">
          Save
        </Button>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </FormContext>
  )
}

export default Form
