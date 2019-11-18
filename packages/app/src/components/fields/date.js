import React from 'react'
import { useField } from 'formik'
import Grid from '@material-ui/core/Grid'
import { DatePicker } from '@material-ui/pickers'
import { ErrorMessage, hasError } from './helper'
import format from 'date-fns/format'

const DateField = ({ info, ...props }) => {
  const [field, meta] = useField({ name: info.name })
  const [selectedDate, setSelectedDate] = React.useState(new Date(field.value))

  const handleChange = date => {
    setSelectedDate(date)
    const formatDate = format(date, info.formatSave)
    field.onChange({ target: { id: field.id, name: field.name, value: formatDate } })
  }

  return (
    <Grid item xs={12}>
      <DatePicker
        fullWidth
        inputVariant="outlined"
        id={info.name}
        label={info.label || info.name}
        helperText={info.description}
        error={hasError(meta)}
        showTodayButton
        {...field}
        {...props}
        format={info.format}
        value={selectedDate}
        onChange={handleChange}
      />
      <ErrorMessage meta={meta} />
    </Grid>
  )
}

export default DateField
