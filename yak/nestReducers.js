import {Record} from 'immutable'
import {mergeReducers} from './mergeReducers'

export function nestReducers(reducers) {
  let Reducers = Record(reducers)()

  return mergeReducers({
    init(_, action) {
      return Reducers.map(reducer => reducer(null, action))
    },

    other(state, action) {
      return state.map((s, k) => reducers[k](s, action))
    }
  })
}
