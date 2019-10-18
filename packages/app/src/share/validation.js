import * as yup from 'yup'

class Validation {
  getSchema(fields) {
    let validator
    const schema = {}

    fields.forEach(field => {
      validator = null
      if (field.required) {
        validator = yup
        if (field.type === 'text') {
          schema[field.name] = validator.string().required()
        }
      }
    })

    return yup.object().shape(schema)
  }
}

export default new Validation()
