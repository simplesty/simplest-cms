import t from '../types'

const initialState = {
  items: {}, // collections
  names: [], // names of collection in array
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.COLLECTIONS_INCLUDE:
      return { ...state, ...action.payload }

    case t.COLLECTIONS_ITEM_SAVE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.collectionName]: {
            ...state.items[action.payload.collectionName],
            data: {
              ...state.items[action.payload.collectionName].data,
              [action.payload.data._uid]: action.payload.data,
            },
          },
        },
      }

    case t.VALUES_ITEM_SAVE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.valueName]: {
            ...state.items[action.payload.valueName],
            data: action.payload.data,
          },
        },
      }

    case t.COLLECTIONS_ITEM_DELETE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.collectionName]: {
            ...state.items[action.payload.collectionName],
            data: Object.keys(state.items[action.payload.collectionName].data)
              .filter(itemUid => String(itemUid) !== String(action.payload.uid))
              .reduce((acc, key) => {
                acc[key] = state.items[action.payload.collectionName].data[key]
                return acc
              }, {}),
          },
        },
      }

    default: {
      return state
    }
  }
}
