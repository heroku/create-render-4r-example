import { combineReducers } from 'redux'
import counter from './counter'
import { reducers as cr4rReducers } from 'create-render-4r'

const rootReducer = combineReducers(Object.assign(
  { counter },
  cr4rReducers
))

export default rootReducer
