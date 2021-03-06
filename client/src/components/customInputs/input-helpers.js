import React from 'react'

// keydown navigation keys
export const FORWARD_KEYS = [13, 39, 40, 9]
export const BACKWARD_KEYS = [37, 38]
export const TRACKED_KEYS = [ ...FORWARD_KEYS, ...BACKWARD_KEYS ]

export const moveForward = (current, step = 1) => {
  const selectContainers = [ ...document.getElementsByClassName("custom-select") ]
  selectContainers.forEach(el => el.removeAttribute("tabIndex"))
  const inputs = [ ...document.getElementsByClassName('input') ]
  const index = inputs.indexOf(current) || 0
  const next = inputs[index + step]
  next && next.focus()
} // used for input navigation

export const moveBackward = (current, step = 1) => {
  const selectContainers = [ ...document.getElementsByClassName("custom-select") ]
  selectContainers.forEach(el => el.removeAttribute("tabIndex"))
  const inputs = [ ...document.getElementsByClassName('input') ]
  const index = inputs.indexOf(current) || 0
  const prev = inputs[index - step]
  prev && prev.focus()
}

export const toProperCase = (val) => {
  let words = val.split('-')
  words.forEach((word, i) => {
    let capital = word[0].toUpperCase()
    let lower = word.slice(1).toLowerCase()
    words[i] = capital + lower
  })
  return words.join('-')
} // used to format the display values

export const isObjectAltered = (state, nextState) => {
  if (!state && !nextState) return false
  if (!state) return true
  let result = false
  for (let key in nextState) {
    if (typeof nextState[key] === 'object') {
      result = result || isObjectAltered(state[key], nextState[key])
    } else if (nextState[key] !== state[key]) {
      return true
    }
  }
  return result
} // will compare objects by values and not whole objects -- useful for tracking changes

export const makeDisplayButton = (display, handleToggle) => (
  <button
    className="input-button"
    onClick={ handleToggle } >
    { ` ${ display }` }
  </button>
) // displays current input value and activates toggle

export const makeInputLabel = label => (
  <div className='input-label'>
    { label }
  </div>
)

export const mapOption = (clickHandler, current='') => ({ name, value }) => {
  const selected = (value === current) && 'selected'
  const id = `option-${ name }-${ value }`
  return (
    <button
      className={`select-option input input-button ${selected}`}
      key={ id }
      id={ id }
      value={ value }
      name={ name }
      onClick={ clickHandler } >
      { name }
    </button>
  )
}
