import React from 'react'
import { FormContext, useFormContext } from 'react-hook-form'
import useForm from 'react-hook-form'
import Field from './fields'
import * as yup from 'yup'

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

const Form = ({ fields }) => {
  const methods = useForm({ validationSchema: schema })
  const onSubmit = data => console.log(data)

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Field key={index} info={field} register={methods.register} errors={methods.errors} />
        ))}

        <input type="submit" />
      </form>
    </FormContext>
  )
}

export default Form
