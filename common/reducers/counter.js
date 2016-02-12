import { SET_COUNTER, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter'

export default function counter(state = 0, action) {
  switch (action.type) {
    case SET_COUNTER:
      return action.payload
    default:
      return state
  }
}
