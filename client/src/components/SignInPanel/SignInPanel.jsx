import React, { Component } from 'react'
import './SignInPanel.css'

import Login from './Login/Login'
import Register from './Register/Register'

import spinnerIMG from '../../assets/spinner.svg'
// import imgThing from '../../assets/logo.svg'

import { userFetcher } from '../../helpers/helpers'

const Aux = props => props.children

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase());
}

const initializeState = () => {
  return {
    error: '',
    email: '',
    userName: '',
    password: '',
    loading: false,
    registering: false,
  }
}

class SignInPanel extends Component {
  state = initializeState()

  handleToggle = e => {
    e && e.preventDefault()
    this.setState( prevState => ({
      ...prevState,
      error: '',
      registering: !prevState.registering,
    }))
  }

  handleChange = e => {
    e && e.preventDefault()
    this.setState({
      error: '',
      [e.target.name]: e.target.value,
    })
  }
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin = async e => {
    e && e.preventDefault()
    const { handleLogin } = this.props
    const { registering, email } = this.state
    
    if (!validateEmail(email)) {
      this.setState({ error: 'Invalid Email' })
      return
    }
      
    this.setState({ loading: true }, async () => {
      try {
        let user
        if (registering) {
          user = await userFetcher.register(this.state)
        } else {
          user = await userFetcher.login(this.state)
        }
        if (user.token) {
          handleLogin(user)
        } else {
          this.setState(prevState => ({ ...prevState, loading: false, error: user.error }))
        }
      } catch (err) { console.log(err) }
    })
  }

  render() {
    const { registering, loading } = this.state

    const signInProps = {
      ...this.state,
      handleLogin: this.handleLogin,
      handleChange: this.handleChange,
      handleKeyDown: this.handleKeyDown,
    }

    let toggleButtonText = `Create new user account...`
    if (registering) toggleButtonText = `Login to existing account...`

    let loginHandler = <Login { ...signInProps } />
    if (registering) loginHandler = <Register { ...signInProps } />

    let loadingContent = (
      <Aux>
        <img id="loading-img" alt="" src={spinnerIMG} />
        <p className="loadingMsg">Loading profile...</p>
      </Aux>
    )
    if (!loading) loadingContent = (
      <Aux>
        {loginHandler}
        <button
          id="register-btn"
          onClick={this.handleToggle}>
          {`${toggleButtonText}`}
        </button>
      </Aux>
    )

    return (
      <div className="SignInPanel">
        <div className="Form">
          {loadingContent}
        </div>
      </div>
    )
  }
}

export default SignInPanel
