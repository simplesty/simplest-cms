import { extractArguments, stringToBoolean, removeQuote } from './helpers'
import { isBoolean } from 'lodash'
import { format } from 'date-fns'

const ComponentNames = ['text', 'textarea', 'select', 'checkbox', 'datetime', 'date', 'one']

class Info {
  constructor(row) {
    this.parseArr = this._parse(row, false)
    this.parse = this._parse(row)
    this.errors = []
    this.data = {}
    this.refreshData()
  }

  getData() {
    return this.data
  }

  refreshData() {
    const parse = this.parse
    const data = { required: false }

    // Component
    data.component = this._getComponentName()
    data.arguments = this._getComponentArgs()

    // Select
    if (data.component === 'select') {
      if (data.arguments === null) this._addError('select', 'Requires arguments')
      data.multiple = parse.hasOwnProperty('multiple') ? true : false
      if (data.multiple) data.default = []
    }

    // Checkbox
    if (data.component === 'checkbox') {
      parse['not-required'] = true
      parse.default = stringToBoolean(parse.default)
    }

    // Datetime
    if (data.component === 'datetime') {
      data.formatSave = parse.formatSave
        ? this._normalizeString(parse.formatSave)
        : 'yyyy-MM-dd HH:mm:ss'
      data.format = parse.format ? this._normalizeString(parse.format) : 'DMY'

      if (data.format === 'YMD') data.format = 'yyyy/MM/dd HH:mm:ss'
      if (data.format === 'DMY') data.format = 'dd/MM/yyyy HH:mm:ss'
      if (data.format === 'MDY') data.format = 'MM/dd/yyyy HH:mm:ss'

      parse.default = format(new Date(), data.formatSave)
    }

    // Date
    if (data.component === 'date') {
      data.formatSave = parse.formatSave ? this._normalizeString(parse.formatSave) : 'yyyy-MM-dd'
      data.format = parse.format ? this._normalizeString(parse.format) : 'DMY'

      if (data.format === 'YMD') data.format = 'yyyy/MM/dd'
      if (data.format === 'DMY') data.format = 'dd/MM/yyyy'
      if (data.format === 'MDY') data.format = 'MM/dd/yyyy'

      parse.default = format(new Date(), data.formatSave)
    }

    // One
    if (data.component === 'one') {
      if (parse.one && parse.one.length === 2) {
        data.relation = {
          collection: parse.one[0],
          label_field: parse.one[1],
        }
      } else {
        this._addError('one', 'Requires two arguments')
      }
    }

    // Label
    if (parse.label) data.label = this._normalizeString(parse.label)

    // Description
    if (parse.description) data.description = this._normalizeString(parse.description)

    // Required
    if (parse.hasOwnProperty('required')) data.required = true
    if (parse.hasOwnProperty('not-required')) data.required = false

    // Default
    if (parse.hasOwnProperty('default')) data.default = this._normalizeString(parse.default)

    this.data = data
    return data
  }

  hasError() {
    return this.errors.length >= 1
  }

  /**
   * Get information of the field
   *
   * Here's an example:
   * <code>
   * const infoField = Info._parse(`text default('English') required`, false)
   * // output:
   * // [
   * //   { type: 'text', args: null },
   * //   { type: 'default', args:[ "'English'" ] },
   * //   { type: 'required', args: null }
   * // ]
   * </code>
   *
   * @param {string} row    all Information of the field.
   * @return {array|object}
   */
  _parse(row, inObject = true) {
    const extractWordsRegex = /[\w-]+(\(.*?\))?/gm
    const words = []
    let match, str, name, args

    while ((match = extractWordsRegex.exec(row)) !== null) {
      if (match.index === extractWordsRegex.lastIndex) extractWordsRegex.lastIndex++
      str = match[0]
      name = match[1] ? str.replace(match[1], '') : str
      args = extractArguments(str)
      words.push({ name, args })
    }

    return inObject
      ? words.reduce((acc, cur) => {
          acc[cur.name] = cur.args
          return acc
        }, {})
      : words
  }

  _getComponentName() {
    const comp = this.parseArr.find(item => ComponentNames.indexOf(item.name) >= 0)
    return comp ? comp.name : null
  }

  _getComponentArgs() {
    const comp = this._getComponentName()
    if (comp === null) return null
    let args = this.parse[comp]
    if (args === null) return null
    return args.map(item => removeQuote(item))
  }

  _addError(title, message) {
    this.errors.push({ title, message })
  }

  _normalizeString(str) {
    let temp = str
    if (isBoolean(temp)) return temp
    if (Array.isArray(str)) temp = str[0]
    if (temp.trim) {
      return removeQuote(temp.trim())
    }
    return temp
  }
}

export default Info
