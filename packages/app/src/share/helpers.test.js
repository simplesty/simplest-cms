import { getInfoType } from './helpers'

describe('getInfoType', () => {
  it('checks the result', () => {
    const info = getInfoType('text default(y, z) another("myparam")')

    expect(info.length).toBe(3)

    expect(info[0].type).toBe('text')
    expect(info[0].args).toBe(null)

    expect(info[1].type).toBe('default')
    expect(Array.isArray(info[1].args)).toBe(true)
    expect(info[1].args[0]).toBe('y')
    expect(info[1].args[1]).toBe('z')

    expect(info[2].args[0]).toBe('"myparam"')
  })
})
