import appReducer from './app'
import { combineReducers } from 'redux-immutable'

export default combineReducers({
  app: appReducer,
})
