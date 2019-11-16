import React from 'react'
import { useField } from 'formik'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CheckboxUI from '@material-ui/core/Checkbox'

const Checkbox = ({ info, ...props }) => {
  const [field] = useField({ name: info.name })

  return (
    <Grid item xs={12}>
      <FormControlLabel
        id={info.name}
        label={info.label || info.name}
        control={
          <CheckboxUI name={field.name} {...field} {...props} checked={field.value} value={true} />
        }
      />
    </Grid>
  )
}

export default Checkbox
