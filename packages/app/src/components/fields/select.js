import React from 'react'
import { useField } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextFieldUI from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { ErrorMessage, hasError } from './helper'

const SelectField = ({ info, ...props }) => {
  const [field, meta] = useField({ name: info.name })

  return (
    <Grid item xs={12}>
      <TextFieldUI
        select
        fullWidth
        variant="outlined"
        id={info.name}
        label={info.label || info.name}
        helperText={info.description}
        error={hasError(meta)}
        {...field}
        {...props}
      >
        {info.arguments.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextFieldUI>
      <ErrorMessage meta={meta} />
    </Grid>
  )
}

export default SelectField
