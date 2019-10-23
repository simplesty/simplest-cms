export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const pathnameToTitle = pathname => {
  const arr = pathname.split('/')
  let title = arr.reduce((acc, cur) => {
    if (cur.trim() === '') return acc

    acc.push(capitalize(cur.trim()))
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

export const getInfoType = row => {
  const extractWordsRegex = /\w+(\(.*?\))?/gm
  const words = []
  let match, str, type, args

  while ((match = extractWordsRegex.exec(row)) !== null) {
    if (match.index === extractWordsRegex.lastIndex) extractWordsRegex.lastIndex++
    str = match[0]
    type = match[1] ? str.replace(match[1], '') : str
    args = extractArguments(str)
    words.push({ type, args })
  }

  return words
}
