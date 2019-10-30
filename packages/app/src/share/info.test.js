import Info from './info'

describe('Info', () => {
  it('checks component name ', () => {
    let info
    info = new Info(`text required default(English) label('First Name')`)
    expect(info.getData().component).toBe('text')

    info = new Info(`default(English)`)
    expect(info.getData().component).toBe(null)
  })

  it('checks label ', () => {
    let info
    info = new Info(`text label('First Name')`)
    expect(info.getData().label).toBe('First Name')

    info = new Info(`text label("First Name")`)
    expect(info.getData().label).toBe('First Name')

    info = new Info(`text label(First Name)`)
    expect(info.getData().label).toBe('First Name')

    info = new Info(`text label('"First Name"')`)
    expect(info.getData().label).toBe(`"First Name"`)

    info = new Info(`text label("'First Name'")`)
    expect(info.getData().label).toBe(`'First Name'`)

    info = new Info(`text label('"First Name'")`)
    expect(info.getData().label).toBe(`'"First Name'"`)
  })

  it('checks required ', () => {
    let info
    info = new Info(`text`)
    expect(info.getData().required).toBe(true)

    info = new Info(`text required`)
    expect(info.getData().required).toBe(true)

    info = new Info(`text not-required`)
    expect(info.getData().required).toBe(false)
  })

  it('checks component: text ', () => {
    let info
    info = new Info(`text`)
    expect(info.getData().component).toBe('text')
  })

  it('checks component: textarea ', () => {
    let info
    info = new Info(`textarea`)
    expect(info.getData().component).toBe('textarea')
  })
})
