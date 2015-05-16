import {makeStoreFromReducer} from './makeStoreFromReducer'
import {mergeReducers} from './mergeReducers'

export function makeStoreFromReducers(reducers) {
  return makeStoreFromReducer(mergeReducers(reducers))
}
