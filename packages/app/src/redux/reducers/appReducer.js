import t from '../types'

const initialState = {
  status: {
    store: {
      // it's useful when autosave = true
      saving: null,
      error: null,
    },
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.STORE_SAVING:
      return {
        ...state,
        status: {
          ...state.status,
          store: {
            saving: true,
            error: null,
          },
        },
      }

    case t.STORE_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          store: {
            saving: false,
            error: null,
          },
        },
      }

    case t.STORE_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          store: {
            saving: false,
            error: action.payload,
          },
        },
      }

    default: {
      return state
    }
  }
}
