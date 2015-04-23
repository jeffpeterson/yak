import Immutable from 'immutable'

export function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true
  }

  if (!objA || !objB) {
    return false
  }

  if (typeof objA !== 'object' || typeof objB !== 'object') {
    return false
  }

  for (let key in objA) {
    if (!(key in objB) || !Immutable.is(objA[key], objB[key])) {
      return false
    }
  }

  for (let key in objB) {
    if (!(key in objA)) {
      return false
    }
  }

  return true
}
