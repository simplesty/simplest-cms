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

  const options = React.useMemo(() => {
    return info.options && Array.isArray(info.options)
      ? info.options
      : info.arguments.reduce((acc, key) => {
          acc.push({
            value: key,
            label: key,
          })
          return acc
        }, [])
  }, [info.arguments, info.options])

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
          {options.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ErrorMessage meta={meta} />
    </Grid>
  )
}

export default SelectField
