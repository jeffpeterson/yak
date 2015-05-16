import {makeStoreFromReducers} from './makeStoreFromReducers'
import {nestReducers} from './nestReducers'

export function makeStoreFromNestedReducers(reducers) {
  return makeStoreFromReducers(nestReducers(reducers))
}
