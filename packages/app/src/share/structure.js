import Info from './info'

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

  _generateInfo(propName, propValue) {
    const info = new Info(propValue)

    return {
      name: propName,
      ...info.getData(),
    }
  }
}

export default Structure
