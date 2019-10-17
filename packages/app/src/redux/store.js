import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import collectionsReducer from './reducers/collectionsReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  collections: collectionsReducer,
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
