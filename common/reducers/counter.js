import { SET_COUNTER, SUBSCRIBED, UNSUBSCRIBED } from '../actions/counter'
import Immutable from 'immutable'

const defaultState = new Immutable.Map()

export default function counter(state = defaultState, action) {
  if (typeof state.merge !== 'function') {
    state = Immutable.fromJS(state)
  }
  switch (action.type) {
    case SET_COUNTER:
      return state.set('value', action.payload)
    case SUBSCRIBED:
      return state.set('subscription', action.subscription)
    case UNSUBSCRIBED:
      return state.delete('subscription')
    default:
      return state
  }
}
