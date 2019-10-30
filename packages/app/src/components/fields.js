import React from 'react'
import { useFormContext } from 'react-hook-form'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'

/*-----------------------------------------------------------------------------
| TextArea
|-----------------------------------------------------------------------------*/

const TextArea = props => {
  const { register, errors } = useFormContext()
  const { info, defaultValue } = props
  const error = errors[info.name]

  const renderc = React.useMemo(
    () => (
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          type="text"
          fullWidth
          // required={info.required}
          id={info.name}
          name={info.name}
          label={info.label || info.name}
          defaultValue={defaultValue || info.default}
          inputRef={register}
          error={!!error}
          helperText={info.description}
          multiline={true}
          rows={4}
          rowsMax={10}
        />
        <ErrorMessage error={error} />
      </Grid>
    ),
    [defaultValue, error, info.default, info.description, info.label, info.name, register]
  )

  return renderc
}

/*-----------------------------------------------------------------------------
| Input
|-----------------------------------------------------------------------------*/

const Input = props => {
  const { register, errors } = useFormContext()
  const { info, defaultValue } = props
  const error = errors[info.name]

  const renderc = React.useMemo(
    () => (
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          type="text"
          fullWidth
          // required={info.required}
          id={info.name}
          name={info.name}
          label={info.label || info.name}
          defaultValue={defaultValue || info.default}
          inputRef={register}
          error={!!error}
          helperText={info.description}
        />
        <ErrorMessage error={error} />
      </Grid>
    ),
    [defaultValue, error, info.default, info.description, info.label, info.name, register]
  )

  return renderc
}

/*-----------------------------------------------------------------------------
| ErrorMessage
|-----------------------------------------------------------------------------*/

const ErrorMessage = ({ error }) => {
  if (!error) return null
  return <FormHelperText error>{error.message}</FormHelperText>
}

/*-----------------------------------------------------------------------------
| Global
|-----------------------------------------------------------------------------*/

const Field = props => {
  const component = props.info.component
  if (component === 'text') return <Input {...props} />
  if (component === 'textarea') return <TextArea {...props} />
  return <>Not Found Field</>
}

export default Field
