import React, { Component } from 'react'
import './App.css'

import Header from './layout/Header/Header'
import Main from './layout/Main/Main'
import Modal from './layout/Modal/Modal'
import Footer from './layout/Footer/Footer'

import { clearLocalStorage, userFetcher } from './helpers/fetcher'

const initializeState = () => ({
  user: '',
  error: '',
  uploads: [],
  admin: false,
  showModal: false,
  isLoggedIn: false,
})

class App extends Component {
  state = initializeState()
  
  async componentDidMount() {
    const id = localStorage.getItem('user')
    if (!id) return

    try {
      const user = await userFetcher.getUser(id)

      if (user.error) {
        const error = `error: ${user.error}`
        this.setState({ error })
      } else {
        this.setState({
          isLoggedIn: true,
          admin: user.admin,
          user: user.userName,
          uploads: user.uploads || [],
        })
      }
    } catch(err) { console.log(err) }
  }

  handleLogin = user => {
    if (!user.userName) {
      const error = `error: ${user.error}`
      this.setState({ error })
    } else {
      this.setState({
        isLoggedIn: true,
        admin: user.admin || false,
        user: user.userName,
        uploads: user.uploads,
      })
    }
  }
  handleLogout = e => {
    e && e.preventDefault()
    this.setState({ ...initializeState(), isLoggedIn: false }, clearLocalStorage())
  }
  toggleModal = e => {
    e && e.preventDefault()
    this.setState(({showModal}) => ({ showModal: !showModal }))
  }

  render() {
    const { isLoggedIn, user, uploads, showModal, admin, error } = this.state
    const headerProps = {
      user,
      isLoggedIn,
      handleLogout: this.handleLogout,
    }
    const mainProps = {
      user,
      admin,
      error,
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
