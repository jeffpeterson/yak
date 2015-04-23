import {makeStoreFromReducer} from './makeStoreFromReducer'
import {mergeReducers} from './mergeReducers'

export function makeStoreFromReducers(reds) {
  return makeStoreFromReducer(mergeReducers(reds))
}
