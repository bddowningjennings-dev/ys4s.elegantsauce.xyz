import React, { Component } from 'react'
import './SignInPanel.css'

import Login from './Login/Login'
import Register from './Register/Register'

import { userFetcher } from '../../helpers/fetcher'
import { aux as Aux, validateEmail } from '../../helpers/helpers'

import spinnerIMG from '../../assets/spinner.svg'

const initializeState = () => ({
  error: '',
  email: '',
  userName: '',
  password: '',
  loading: false,
  registering: false,
})

class SignInPanel extends Component {
  state = initializeState()

  handleKeyDown = e => (e.keyCode === 13) && this.handleLogin()
  handleToggle = e => {
    e && e.preventDefault()
    this.setState(({ registering }) => ({
      error: '',
      registering: !registering,
    }))
  }
  handleChange = e => {
    e && e.preventDefault()
    this.setState({
      error: '',
      [e.target.name]: e.target.value,
    })
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
        if (registering) user = await userFetcher.register(this.state)
        else user = await userFetcher.login(this.state)

        if (user.token) handleLogin(user)
        else this.setState({ loading: false, error: user.error })

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
    let loginHandler = <Login {...signInProps} />
    
    if (registering) {
      toggleButtonText = `Login to existing account...`
      loginHandler = <Register {...signInProps} />
    }

    let loadingContent = <Aux>
      <img id="loading-img" alt="" src={spinnerIMG} />
      <p className="loadingMsg">Loading profile...</p>
    </Aux>

    if (!loading) loadingContent = <Aux>
      {loginHandler}
      <button
        id="register-btn"
        onClick={this.handleToggle}>
        {`${toggleButtonText}`}
      </button>
    </Aux>

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
