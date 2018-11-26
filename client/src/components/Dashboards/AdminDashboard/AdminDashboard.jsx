import React, { Component } from 'react'
import './AdminDashboard.css'

import UserList from './UserList/UserList'

import { userFetcher } from '../../../helpers/fetcher'

const removeAdmin = users => {
  const adminID = localStorage.getItem('user')
  return users.filter(user => user._id !== adminID)
}

const initializeState = props => ({
  users: [],
  error: '',
})

class AdminDashboard extends Component {
  state = initializeState()

  async componentDidMount() {
    const adminID = localStorage.getItem('user')
    try {
      let users = await userFetcher.adminGetUsers(adminID)
      if (users.error) this.setState({ error: users.error })
      else this.setState({ users })
    } catch(err) { console.log(err) }
  }

  render() {
    const { users, error } = this.state
    return (
      <div className='AdminDashboard'>
        {error}
        <UserList users={removeAdmin(users)} />
      </div>
    )
  }
}
export default AdminDashboard
