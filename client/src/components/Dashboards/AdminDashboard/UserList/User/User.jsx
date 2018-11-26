import React, { Component } from 'react'
import './User.css'

import UploadList from '../../../UploadList/UploadList'

const initializeState = ({ user: { uploads } }) => ({
  uploads,
  collapsed: true,
  filter: 'new_type',
})

class User extends Component {
  state = initializeState(this.props)

  applyFilter = filter => e => {
    e && e.preventDefault()
    this.setState({ filter })
  }
  toggleCollapse = e => {
    e && e.preventDefault()
    this.setState(({ collapsed })=>({ collapsed: !collapsed }))
  }

  updateUpload = upload => {
    const { _id: id } = upload
    const { uploads } = this.state
    const otherUploads = uploads.filter(upload => upload._id !== id)
    this.setState({ uploads: [ upload, ...otherUploads ]}, ()=>console.log('new', this.state.uploads))
  }

  removeUpload = upload => {
    this.setState( ({ uploads }) => ({ uploads: [ ...uploads.filter( up => up._id !== upload._id ) ] }))
  }

  render() {
    const { user: { userName, email, profile_img } } = this.props
    const { filter, collapsed, uploads } = this.state

    const uploadListProps = {
      filter,
      uploads,
      applyFilter: this.applyFilter,
      updateUpload: this.updateUpload,
      removeUpload: this.removeUpload,
    }
    return (
      <div className='User'>
          <button onClick={this.toggleCollapse}><img alt="profile_img" src={profile_img} /> {userName} - {email}</button>
        <section className="user-uploads">
          

          {(!collapsed) && <UploadList {...uploadListProps} />}
          
        </section>
      </div>
    )
  }
}

export default User
