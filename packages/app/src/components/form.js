import React from 'react'
import { FormContext, useFormContext } from 'react-hook-form'
import useForm from 'react-hook-form'
import Field from './fields'
import * as yup from 'yup'
import { getThemeProps } from '@material-ui/styles'

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
})

export const ConnectForm = ({ children }) => {
  const methods = useFormContext()

  return children({
    ...methods,
  })
}

const Form = ({ fields, initValues, onSubmit, onCancel }) => {
  const methods = useForm({ validationSchema: schema })

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Field
            key={index}
            defaultValue={initValues && initValues[field.name]}
            info={field}
            register={methods.register}
            errors={methods.errors}
          />
        ))}

        <input type="submit" />
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </FormContext>
  )
}

export default Form
