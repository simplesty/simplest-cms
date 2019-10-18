class Structure {
  constructor(structure) {
    this.structure = structure
    this.collections = {}
    this.init()
  }

  async init() {
    Object.keys(this.structure).forEach(key => {
      const collection = this.structure[key]
      const fields = []

      Object.keys(collection).forEach(k => {
        const field = collection[k]
        fields.push(this._generateInfo(k, field))
      })

      this.collections[key] = { fields, data: {} }
    })
  }

  getCollectionNames() {
    return Object.keys(this.structure).map(key => {
      return { name: key }
    })
  }

  loadData() {
    return fetch(window.baseurl + `/data.json`)
      .then(res => res.json())
      .then(result => {
        const data = result.data
        Object.keys(this.structure).forEach(key => {
          this.collections[key].data = data[key] ? data[key] : {}
        })
        return data
      })
  }

  _generateInfo(prop, value) {
    const actions = String(value).split(' ')
    const info = {
      type: undefined,
      required: true,
      name: prop,
    }

    // Types
    if (actions.indexOf('text') >= 0) info.type = 'text'
    if (actions.indexOf('textarea') >= 0) info.type = 'textarea'
    if (actions.indexOf('number') >= 0) info.type = 'number'

    // Options
    if (actions.indexOf('required') >= 0) info.required = true
    if (actions.indexOf('not-required') >= 0) info.required = false

    return info
  }
}

export default Structure
