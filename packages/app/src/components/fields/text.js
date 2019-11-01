import React from 'react'
import { useField } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextFieldUI from '@material-ui/core/TextField'
import { ErrorMessage, hasError } from './helper'

const TextField = ({ info, ...props }) => {
  const [field, meta] = useField({ name: info.name })

  return (
    <Grid item xs={12}>
      <TextFieldUI
        type="text"
        fullWidth
        variant="outlined"
        id={info.name}
        label={info.label || info.name}
        helperText={info.description}
        error={hasError(meta)}
        {...field}
        {...props}
      />
      <ErrorMessage meta={meta} />
    </Grid>
  )
}

export default TextField
