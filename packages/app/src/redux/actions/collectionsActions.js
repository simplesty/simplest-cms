import t from '../types'
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

  saveInJson: () => {
    return (_, getstate) => {
      const items = getstate().collections.items
      const normalize = {}

      Object.keys(items).forEach(collectionName => {
        normalize[collectionName] = items[collectionName].data
      })

      return fetch('http://localhost:8001', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ colletions: normalize }),
      })
        .then(res => {
          return res.json ? res.json() : { status: 'error', message: res, code: 'no-json()' }
        })
        .then(result => {
          return result
        })
        .catch(error => {
          console.log('Error:', error)
          return error
        })
    }
  },
}
