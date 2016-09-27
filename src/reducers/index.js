import { combineReducers } from 'redux-immutable'
import appReducer from './app'

export default combineReducers({
  app: appReducer
})
