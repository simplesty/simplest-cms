import React from 'react'
import { useFormContext } from 'react-hook-form'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'

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
          label={info.name}
          defaultValue={defaultValue}
          inputRef={register}
          error={!!error}
        />
        <ErrorMessage error={error} />
      </Grid>
    ),
    [defaultValue, error, info.name, register]
  )

  return renderc
}

const ErrorMessage = ({ error }) => {
  if (!error) return null
  return <FormHelperText error>{error.message}</FormHelperText>
}

/*-----------------------------------------------------------------------------
| Global
|-----------------------------------------------------------------------------*/

const Field = props => {
  if (props.info.type === 'text') return <Input {...props} />
  return <>Not Found Field</>
}

export default Field
