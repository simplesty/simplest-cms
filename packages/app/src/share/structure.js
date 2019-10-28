import trim from 'lodash/trim'
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
        const name = trim(k)
        const values = collection[name]
        fields.push(this._generateInfo(name, values))
      })

      this.collections[key] = { fields, data: {} }
    })
  }

  getCollectionNames() {
    return Object.keys(this.structure).map(key => {
      return {
        name: trim(key),
        isCollection: this._isCollection(key),
      }
    })
  }

  loadData() {
    return fetch(window.baseurl + `/data.json`)
      .then(res => res.json())
      .then(result => {
        return this._normalizeResult(result)
      })
      .catch(() => {
        // try a new shot
        // in this time, using .php as a middleware
        return fetch(window.baseurl + `/?data`)
          .then(res => res.json())
          .then(result => {
            return this._normalizeResult(result)
          })
      })
  }

  _normalizeResult(result) {
    const data = result.data
    Object.keys(this.structure).forEach(key => {
      if (this._isCollection(key)) {
        this.collections[key].data = data[key] ? data[key] : {}
      } else {
        this.collections[key].data = data[key.slice(1)] ? data[key.slice(1)] : {}
      }
    })
    return data
  }

  _generateInfo(propName, propValue) {
    const info = new Info(propValue)

    return {
      name: propName,
      ...info.getData(),
    }
  }

  _isCollection(keyname) {
    return keyname.slice(0, 1) !== '@'
  }
}

export default Structure
