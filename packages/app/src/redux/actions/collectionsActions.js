import t from '../types'
import yaml from 'js-yaml'
import Structure from '../../share/structure'

export default {
  all: () => {
    return dispatch => {
      return fetch(window.baseurl + '/structure.yaml')
        .then(res => res.text())
        .then(text => {
          const structure = yaml.load(text)
          const st = new Structure(structure)
          return st.loadAllData().then(collections => {
            dispatch({
              type: t.COLLECTIONS_INCLUDE,
              payload: {
                items: st.collections,
                names: st.getCollectionNames(),
              },
            })
            return collections
          })
        })
    }
  },
}
