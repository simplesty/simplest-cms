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

  save: (collectionName, data) => {
    return dispatch => {
      dispatch({
        type: t.COLLECTIONS_ITEM_SAVE,
        payload: {
          collectionName: collectionName,
          data: data,
        },
      })
      return Promise.resolve(data)
    }
  },

  delete: (collectionName, uid) => {
    return dispatch => {
      dispatch({
        type: t.COLLECTIONS_ITEM_DELETE,
        payload: {
          collectionName: collectionName,
          uid: uid._uid || uid,
        },
      })
      return Promise.resolve(true)
    }
  },
}
