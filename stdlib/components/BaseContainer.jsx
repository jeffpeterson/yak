import React from 'react'
import {Map} from 'immutable'
import {Base} from './Base'

import {Dispatcher} from 'core/Dispatcher'
import {Store} from 'core/Store'

export class BaseContainer extends Base {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this._keyPath = this.keyPath()
    this.state = this.calculateState(Store.getState())

    this.actions = Map(this.autoBindActions().map(name => [
      name,
      this.triggerAction.bind(this, name)
    ])).toJS()
  }

  keyPath() {
    return []
  }

  calculateState(storeState) {
    return {
      immutable: storeState.getIn(this._keyPath)
    }
  }

  triggerAction(type, params) {
    Dispatcher.dispatch({type, ...params})
  }

  autoBindActions(names) {
    return []
  }

  componentDidMount() {
    Store.onChange(this.onChange)
  }

  componentWillUnmount() {
    Store.offChange(this.onChange)
  }

  onChange(state) {
    this.setState(this.calculateState(state))
  }
}
