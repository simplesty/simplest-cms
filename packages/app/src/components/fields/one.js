import React from 'react'
import { useField } from 'formik'
import Grid from '@material-ui/core/Grid'
import TextFieldUI from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { ErrorMessage, hasError } from './helper'
import { useSelector } from 'react-redux'

const RelationToOne = ({ info, ...props }) => {
  const [field, meta] = useField({ name: info.name })
  const options = useSelector(state => state.collections.items[info.relation.collection].data)

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
        {Object.keys(options).map(key => (
          <MenuItem key={key} value={key}>
            {options[key][info.relation.label_field]}
          </MenuItem>
        ))}
      </TextFieldUI>
      <ErrorMessage meta={meta} />
    </Grid>
  )
}

export default RelationToOne
