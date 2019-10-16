class Structure {

  constructor(structure) {
    this.structure = structure;
    this.collections = {}
    this.init();
  }

  init() {
    Object.keys(this.structure).forEach(key => {
      const collection = this.structure[key];
      const fields = []

      Object.keys(collection).forEach(k => {
        const field = collection[k];
        fields.push(this._generateInfo(k, field))
      })

      this.collections[key] = { fields };
    })
  }

  _generateInfo(prop, value) {
    const actions = String(value).split(' ');
    const info = {
      type: undefined,
      required: true,
      name: prop,
    }

    if(actions.indexOf('string') >= 0) info.type = 'input'
    if(actions.indexOf('required') >= 0) info.required = true
    if(actions.indexOf('not-required') >= 0) info.required = false

    return info
  }

}

export default Structure