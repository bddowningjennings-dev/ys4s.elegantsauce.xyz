import React from 'react'
import './Register.css'

const register = props => {
  const { userName, email, password, error } = props
  const { handleChange, handleLogin, handleKeyDown } = props
  
  return (
    <div className="Register">      
    { error && <div className="Error">
      { error }
    </div>}
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type='text'
        name='userName'
        value={ userName }
        placeholder='Name'
      />
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
        <button onClick={ handleLogin }> Register </button>
      </div>

    </div>
  )
}

export default register
