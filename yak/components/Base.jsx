import React from 'react'

import {shallowEqual} from '../shallowEqual'

export class Base extends React.Component {
  constructor(props) {
    super(props)

    this.autoBind && this.autoBind().forEach(fnName => this[fnName] = this[fnName].bind(this))
  }

  shouldComponentUpdate(prevProps, prevState) {
    return !shallowEqual(this.props, prevProps) || !shallowEqual(this.state, prevState)
  }

  setInState(keyPath, val) {
    return this.setState({
      immutable: this.state.immutable.setIn(keyPath, val)
    })
  }

  getInState(keyPath, val) {
    return this.state.immutable.getIn(keyPath)
  }

  updateInState(keyPath, fn) {
    return this.setState({
      immutable: this.state.immutable.updateIn(keyPath, fn)
    })
  }
}
