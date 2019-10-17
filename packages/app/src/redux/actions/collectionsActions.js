import t from '../types'
import yaml from 'js-yaml'
import Structure from '../../share/structure'

export default {
  all: () => {
    return dispatch => {
      const st = new Structure(window.collections)
      return st.loadData().then(() => {
        dispatch({
          type: t.COLLECTIONS_INCLUDE,
          payload: {
            items: st.collections,
            names: st.getCollectionNames(),
          },
        })
        return true
      })
    }
  },
}
