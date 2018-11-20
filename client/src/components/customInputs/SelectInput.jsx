import React, { Component } from 'react'
import './Inputs.css'

import { makeInputLabel, makeDisplayButton, mapOption } from './input-helpers'

const initializeState = props => {
  const { value = '' } = props
  return {
    value,
    active: false,
  }
}

export default class SelectInput extends Component {
  state = initializeState(this.props)

  pushOwnState = () => {
    const { passState = ()=>{alert('no passState')}, name } = this.props
    passState(name, this.state)
  }
  handleToggle = e => {
    e && e.preventDefault()
    this.setState( ({ active }) => ({ active: !active }), this.pushOwnState )
  }
  setValue = e => {
    e && e.preventDefault()
    const { value } = e.target
    this.setState(({ active }) => ({
      value,
      active: !active,
    }), this.pushOwnState)
  }

  render() {

    const { active, value } = this.state
    const { label, options = [] } = this.props

    let display = ' - - - - - '
    const displays = options.filter( option => option.value === value )
    if (displays.length > 0) display = displays[0].name

    const inputLabel = makeInputLabel(label)
    let inputContent = makeDisplayButton(display, this.handleToggle)
    if (active) inputContent = options.map( mapOption(this.setValue) )

    return (
      <div className='SelectInput'>
        { inputLabel }
        <div className='input-content custom-select'>
          { inputContent }
        </div>    
      </div>
    )
  }
}
