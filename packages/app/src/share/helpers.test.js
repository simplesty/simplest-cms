import { extractArguments, stringToBoolean, removeQuote } from './helpers'

describe('extractArguments', () => {
  it('checks the args', () => {
    let args
    args = extractArguments('range(y, z)')
    expect(args.length).toBe(2)

    args = extractArguments('range (y, z)')
    expect(args.length).toBe(2)

    args = extractArguments(`range ( 'y', "z")`)
    expect(args.length).toBe(2)
    expect(args[0]).toBe(`'y'`)
    expect(args[1]).toBe(`"z"`)
  })
})

describe('stringToBoolean', () => {
  it('checks conditions', () => {
    expect(stringToBoolean('"any"')).toBe(true)
    expect(stringToBoolean('any')).toBe(true)

    expect(stringToBoolean('yes')).toBe(true)
    expect(stringToBoolean('1')).toBe(true)
    expect(stringToBoolean(1)).toBe(true)
    expect(stringToBoolean('true')).toBe(true)
    expect(stringToBoolean('TRue')).toBe(true)
    expect(stringToBoolean(true)).toBe(true)

    expect(stringToBoolean('no')).toBe(false)
    expect(stringToBoolean('0')).toBe(false)
    expect(stringToBoolean(0)).toBe(false)
    expect(stringToBoolean('false')).toBe(false)
    expect(stringToBoolean('faLSE')).toBe(false)
    expect(stringToBoolean(false)).toBe(false)
  })
})

describe('removeQuote', () => {
  it('checks conditions', () => {
    expect(removeQuote('"any"')).toBe('any')
    expect(removeQuote("'any'")).toBe('any')
    expect(removeQuote('any')).toBe('any')
  })
})
