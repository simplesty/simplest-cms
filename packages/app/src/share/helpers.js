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
