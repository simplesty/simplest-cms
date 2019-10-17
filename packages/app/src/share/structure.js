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

  // [deprecate] used within loadAllData()
  _loadData(collectionName) {
    return fetch(window.baseurl + `/data-${collectionName}.json`)
      .then(res => res.json())
      .then(result => {
        return result.data
      })
  }

  // [deprecate] now we have only one file (data.json)
  loadAllData() {
    const dictionary = Object.keys(this.structure).map(key => key)
    const promises = Object.keys(this.structure).map(key => {
      return this._loadData(key)
    })

    return new Promise((res, rej) => {
      Promise.all(promises).then(values => {
        const result = {}
        values.forEach((data, index) => {
          const key = dictionary[index]
          this.collections[key].data = data
          result[key] = data
        })
        res(result)
      })
    })
  }

  loadData() {
    return fetch(window.baseurl + `/data.json`)
      .then(res => res.json())
      .then(result => {
        const data = result.data
        Object.keys(this.structure).map(key => {
          this.collections[key].data = data[key]
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

    if (actions.indexOf('string') >= 0) info.type = 'input'
    if (actions.indexOf('required') >= 0) info.required = true
    if (actions.indexOf('not-required') >= 0) info.required = false

    return info
  }
}

export default Structure
