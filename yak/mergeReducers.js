import {Map, Record} from 'immutable'

export function mergeReducers(reducers) {
  let State = Record(reducers)
  let reds = Map(reducers).map(normalize)

  return function reducer(state, action) {
    return State(reds.map((reduce, k) => reduce(state ? state.get(k) : null, action)))
  }
}

function normalize(red) {
  if (typeof red === "function") {
    return red
  }

  return reducer

  function reducer(state, action) {
    let fn = red[action.type] || red.other

    return fn ? fn(state, action) : state
  }
}
