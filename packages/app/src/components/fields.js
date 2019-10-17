import React from 'react'
import { useFormContext } from 'react-hook-form'

const Input2 = props => {
  const {
    register,
    // formState: { dirty },
  } = useFormContext()
  const { info, defaultValue } = props
  const renderc = React.useMemo(
    () => (
      <div>
        <label>
          {info.name}
          <input type="text" defaultValue={defaultValue} name={info.name} ref={register} />
        </label>
        <ErrorMessage {...props} />
      </div>
    ),
    [defaultValue, info.name, props, register]
  )

  return renderc
}

// [deprecate]
// const Input = props => {
//   const { info, defaultValue } = props
//   return (
//     <div>
//       <label>
//         {info.name}
//         <input type="text" defaultValue={defaultValue} name={info.name} ref={props.register} />
//       </label>
//       <ErrorMessage {...props} />
//     </div>
//   )
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
