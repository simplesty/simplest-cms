import t from '../types'
import Structure from '../../share/structure'

const all = function() {
  return dispatch => {
    const st = new Structure(window.schema)
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
}

const save = function(collectionName, data) {
  return dispatch => {
    dispatch({
      type: t.COLLECTIONS_ITEM_SAVE,
      payload: {
        collectionName: collectionName,
        data: data,
      },
    })
    if (window.config.autosave) {
      dispatch(saveInJson())
    }
    return Promise.resolve(data)
  }
}

const remove = function(collectionName, uid) {
  return dispatch => {
    dispatch({
      type: t.COLLECTIONS_ITEM_DELETE,
      payload: {
        collectionName: collectionName,
        uid: uid._uid || uid,
      },
    })
    if (window.config.autosave) {
      dispatch(saveInJson())
    }
    return Promise.resolve(true)
  }
}

const saveInJson = function() {
  return (dispatch, getstate) => {
    const items = getstate().collections.items
    const normalize = {}

    dispatch({ type: t.STORE_SAVING })

    Object.keys(items).forEach(collectionName => {
      normalize[collectionName] = items[collectionName].data
    })

    return fetch(window.baseurl + '/index.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalize),
      redirect: 'follow',
    })
      .then(res => {
        return res.json ? res.json() : { status: 'error', message: res, code: 'no-json()' }
      })
      .then(result => {
        if (result.status !== 'ok') {
          dispatch({ type: t.STORE_FAILURE, payload: result })
        } else {
          dispatch({ type: t.STORE_SUCCESS, payload: result })
        }
        return result
      })
      .catch(error => {
        dispatch({ type: t.STORE_FAILURE, payload: error })
        return error
      })
  }
}

export default {
  all,
  save,
  delete: remove,
  saveInJson,
}
