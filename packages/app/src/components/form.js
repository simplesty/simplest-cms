import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { useFormik, FormikProvider } from 'formik'
import Validation from '../share/validation'
import { Field } from './fields/helper'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

const Form = ({ fields, initialValues, onSubmit, onCancel }) => {
  const classes = useStyles()
  const schema = useMemo(() => Validation.getSchema(fields), [fields])
  const _initialValues = useMemo(() => {
    return {
      ...fields.reduce((acc, cur) => {
        acc[cur.name] = cur.default ? cur.default : ''
        return acc
      }, {}),
      ...initialValues,
    }
  }, [fields, initialValues])

  const formikbag = useFormik({
    initialValues: _initialValues,
    validationSchema: schema,
    onSubmit,
  })

  const { handleSubmit } = formikbag

  return (
    <>
      <FormikProvider value={formikbag}>
        <form onSubmit={handleSubmit} className={classes.container}>
          <Grid container spacing={2}>
            {fields.map((field, index) => (
              <Field key={index} info={field} />
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
      </FormikProvider>
    </>
  )
}

export default Form
