import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import collectionsReducer from './reducers/collectionsReducer'
import appReducer from './reducers/appReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  collections: collectionsReducer,
  app: appReducer,
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
