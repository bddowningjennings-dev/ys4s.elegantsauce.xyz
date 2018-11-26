import React from 'react'
import './Register.css'

const register = props => {
  const { userName, email, password, error } = props
  const { handleChange, handleLogin, handleKeyDown } = props
  
  const errorContent = !error ? '' : (
    <div className="Error">
      { error }
    </div>
  )

  return (
    <div className="Register">      
      { errorContent }
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
