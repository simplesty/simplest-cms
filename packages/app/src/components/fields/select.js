import React from 'react'
import { useField } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { ErrorMessage, hasError } from './helper'

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 220,
    maxWidth: '100%',
  },
}))

const SelectField = ({ info, ...props }) => {
  const classes = useStyles()
  const [field, meta] = useField({ name: info.name })
  const [labelWidth, setLabelWidth] = React.useState(0)
  const inputLabel = React.useRef(null)

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <Grid item xs={12}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id={`${info.name}-label`} ref={inputLabel}>
          {info.label || info.name}
        </InputLabel>
        <Select
          multiple={!!info.multiple}
          id={`${info.name}`}
          labelId={`${info.name}-label`}
          label={info.label || info.name}
          error={hasError(meta)}
          {...field}
          {...props}
          labelWidth={labelWidth}
        >
          {info.arguments.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ErrorMessage meta={meta} />
    </Grid>
  )
}

export default SelectField
