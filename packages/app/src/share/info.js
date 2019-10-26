import { extractArguments } from './helpers'

const ComponentNames = ['text', 'textarea', 'select']

class Info {
  constructor(row) {
    this.parseArr = this._parse(row, false)
    this.parse = this._parse(row)
  }

  getData() {
    const parse = this.parse
    const data = {
      required: true,
    }

    // Component
    data.component = this._getComponent()

    // Label
    if (parse.label) data.label = this._normalizeString(parse.label)

    // Description
    if (parse.description) data.description = this._normalizeString(parse.description)

    // Required
    if (parse.hasOwnProperty('required')) data.required = true
    if (parse.hasOwnProperty('not-required')) data.required = false

    // Default
    if (parse.hasOwnProperty('default')) data.default = parse.default[0]

    return data
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

  _getComponent() {
    const comp = this.parseArr.find(item => ComponentNames.indexOf(item.name) >= 0)
    return comp ? comp.name : null
  }

  _normalizeString(str) {
    let temp = str
    if (Array.isArray(str)) temp = str[0]
    return this._removeQuote(temp.trim())
  }

  /**
   * Removing First and Last Double/Simple Quotes
   *
   * @param {string} str
   */
  _removeQuote(str) {
    if (str[0] === '"') {
      str = str.replace(/^"(.+)"$/, '$1')
    } else if (str[0] === "'") {
      str = str.replace(/^'(.+)'$/, '$1')
    }
    return str
  }
}

export default Info
