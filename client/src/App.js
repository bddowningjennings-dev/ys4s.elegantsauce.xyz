import React, { Component } from 'react'
import './App.css'

import Header from './layout/Header/Header'
import Main from './layout/Main/Main'
import Modal from './layout/Modal/Modal'
import Footer from './layout/Footer/Footer'

import { clearLocalStorage, fetcher } from './helpers/helpers'

const initializeState = () => {
  const user = localStorage.getItem('user')
  return {
    user,
    uploads: [],
    showModal: false,
    isLoggedIn: user ? true : false,
  }
}

class App extends Component {
  state = initializeState()
  tommy = null

  async componentDidMount() {
    const id = localStorage.getItem('user')
    if (!id) return

    const user = await fetcher.getUser(id)
    if (!user) return alert('user not found')

    this.setState( prevState => ({
      ...prevState,
      user: user.userName,
      uploads: user.uploads || [],
    })) 
  }

  handleLogin = user => {
    this.setState( prevState => ({
      ...prevState,
      isLoggedIn: true,
      user: user.userName,
      uploads: user.uploads,
    }))
  }
  handleLogout = e => {
    e && e.preventDefault()
    this.setState({ ...initializeState(), isLoggedIn: false }, clearLocalStorage())
  }
  toggleModal = e => {
    e && e.preventDefault()
    this.setState( prevState => ({
      ...prevState,
      showModal: !prevState.showModal,
    }))
  }

  render() {
    const { isLoggedIn, user, uploads, showModal } = this.state
    const headerProps = {
      user,
      isLoggedIn,
      handleLogout: this.handleLogout,
    }
    const mainProps = {
      user,
      uploads,
      isLoggedIn,
      handleLogin: this.handleLogin,
    }
    const modalProps = {
      showModal,
      toggleModal: this.toggleModal,
    }

    return (
      <div className="App" >
        <Modal {...modalProps} />
        <Header {...headerProps} />
        <Main {...mainProps} />
        <Footer />
      </div>
    )
  }
}

export default App
