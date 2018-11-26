import React from 'react'
import './Login.css'

const login = props => {
  const { email, password, error } = props
  const { handleChange, handleLogin, handleKeyDown } = props

  const errorContent = !error ? '' : (
    <div className="Error">
      { error }
    </div>
  )

  return (
    <div className="Login">
      {errorContent}
      <input
        onChange={ handleChange }
        onKeyDown={handleKeyDown}
        type='email'
        name='email'
        value={ email }
        placeholder='Email'
      />
      <input
        onChange={ handleChange }
        onKeyDown={handleKeyDown}
        type='password'
        name='password'
        value={ password }
        placeholder='Password'
      />
      
      <div className='buttons'>
        <button onClick={ handleLogin }> Login </button>
      </div>

    </div>
  )
}

export default login
