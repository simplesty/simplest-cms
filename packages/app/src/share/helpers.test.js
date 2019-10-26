import { extractArguments } from './helpers'

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
