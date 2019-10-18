import React from 'react'
import { useFormContext } from 'react-hook-form'
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
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          type="text"
          required={info.required}
          id={info.name}
          name={info.name}
          label={info.name}
          defaultValue={defaultValue}
          inputRef={register}
          error={!!error}
        />
        <ErrorMessage error={error} />
      </div>
    ),
    [defaultValue, error, info.name, info.required, register]
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
  if (props.info.type === 'input') return <Input {...props} />
  return <>Not Found Field</>
}

export default Field
