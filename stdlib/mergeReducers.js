export function mergeReducers(reducers) {
  return function reducer(state, action) {
    let fn = reducers[action.type] || reducers.other

    return fn ? fn(state, action) : state
  }
}
