import t from '../types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.COLLECTIONS_INCLUDE:
      return { ...state, ...action.payload }

    default: {
      return state
    }
  }
}
