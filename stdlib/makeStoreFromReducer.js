import {Set} from 'immutable'

export function makeStoreFromReducer(reducer) {
  return new Store(reducer)
}

class Store {
  constructor(reducer) {
    this.reducer = reducer
    this.state = reducer(null, {type: 'init'})

    this._emitChange = this._emitChange.bind(this)
    this.handleAction = this.handleAction.bind(this)

    this.listeners = new Set()
    this.waitingToEmit = false
  }

  getState() {
    return this.state
  }

  handleAction(action) {
    this.state = this.reducer(this.state, action)
    this.emitChange()
  }

  onChange(fn) {
    this.listeners = this.listeners.add(fn)
  }

  offChange(fn) {
    this.listeners = this.listeners.remove(fn)
  }

  emitChange() {
    if (!this.waitingToEmit) {
      this.waitingToEmit = true
      requestAnimationFrame(this._emitChange)
    }
  }

  _emitChange() {
    this.waitingToEmit = false
    for (var l of this.listeners) {
      l(this.state)
    }
  }
}
