import React from 'react'
import useForm, { useFormContext } from 'react-hook-form'

const View = React.memo(({ name }) => `Hi, I'm ${name}`)

const Input2 = props => {
  const {
    register,
    formState: { dirty },
  } = useFormContext()
  const { info } = props
  const renderc = React.useMemo(
    () => (
      <div>
        <label>
          {info.name}
          <input type="text" name={info.name} ref={register} />
        </label>
      </div>
    ),
    [info.name, register]
  )

  console.log(info)

  return renderc

  return (
    <div>
      <View name="pora" />
      <label>
        {info.name}
        <input type="text" name={info.name} ref={register} />
      </label>
    </div>
  )

  return React.memo(() => (
    <div>
      <label></label>
    </div>
  ))
}

const Input = props => {
  const { info } = props

  return (
    <div>
      <label>
        {info.name}
        <input type="text" name={info.name} ref={props.register} />
      </label>
      <ErrorMessage {...props} />
    </div>
  )
}

const ErrorMessage = props => {
  const { info, errors } = props
  return <>{errors[info.name] && <p>{errors[info.name].message}</p>}</>
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const Field = props => {
  if (props.info.type === 'input') return <Input2 {...props} />
  return <>Not Found Field</>
}

export default Field
