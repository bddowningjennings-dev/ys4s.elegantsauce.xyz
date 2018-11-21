import React, { Component } from 'react'
import './User.css'

import UploadList from '../../../UploadList/UploadList'

const initializeState = () => ({
  collapsed: true,
  filter: 'active_type',
})

class User extends Component {
  state = initializeState()

  applyFilter = filter => e => {
    e && e.preventDefault()
    this.setState({ filter })
  }
  toggleCollapse = e => {
    e && e.preventDefault()
    this.setState(({ collapsed })=>({ collapsed: !collapsed }))
  }

  render() {
    const { user: { userName, email, profile_img, uploads } } = this.props
    const { filter, collapsed } = this.state

    const uploadListProps = {
      filter,
      uploads,
      applyFilter: this.applyFilter,
    }
    return (
      <div className='User'>
        <img alt="profile_img" src={profile_img} />
        {userName} - {email}
        <section className="user-uploads">
          
          <button onClick={this.toggleCollapse}>Show</button>

          {(!collapsed) && <UploadList {...uploadListProps} />}
          
        </section>
      </div>
    )
  }
}

export default User
