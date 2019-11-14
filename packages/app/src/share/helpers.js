import capitalize from 'lodash/capitalize'
import trim from 'lodash/trim'

export const pathnameToTitle = pathname => {
  const arr = pathname.split('/')
  let title = arr.reduce((acc, cur) => {
    const str = trim(cur)
    if (str === '') return acc

    acc.push(capitalize(str))
    return acc
  }, [])

  title = title.join(' / ')

  if (title === '') title = 'Dashboard'

  return title
}

export const extractPathname = url => {
  const parts = RegExp(/.+?:\/\/.+?(\/.+?)?(?:#|\?|)?$/).exec(url)
  return parts[1] ? parts[1] : '/'
}

export const extractArguments = str => {
  const extractFunctionsRegex = /\(\s*([^)]+?)\s*\)/gm
  const extractArgsRegex = /\s*,\s*/
  const args = extractFunctionsRegex.exec(str)

  if (args && args[1]) {
    return args[1].split(extractArgsRegex)
  }

  return null
}

export const stringToBoolean = function(value) {
  let temp = value
  if (Array.isArray(value)) temp = value[0]
  if (temp && temp.toLowerCase) temp = removeQuote(temp.toLowerCase().trim())
  switch (temp) {
    case 'true':
    case 'yes':
    case '1':
      return true
    case 'false':
    case 'no':
    case '0':
    case undefined:
    case null:
      return false
    default:
      return Boolean(value)
  }
}

/**
 * Removing First and Last Double/Simple Quotes
 *
 * @param {string} str
 */
export const removeQuote = function(str) {
  if (str[0] === `"`) {
    str = str.replace(/^"(.+)"$/, '$1')
  } else if (str[0] === `'`) {
    str = str.replace(/^'(.+)'$/, '$1')
  }
  return str
}
