import React, { Component } from 'react'
import './UserDashboard.css'

import Uploader from './Uploader/Uploader'
import UploadList from '../UploadList/UploadList'

const initializeState = ({ user, uploads = [] }) => ({
  user,
  uploads,
  showUploader: false,
  filter: 'new_type',
})

class UserDashboard extends Component {
  state = initializeState(this.props)

  componentDidUpdate(lastProps, lastState) {
    const { uploads } = this.props
    if (uploads !== lastProps.uploads) this.setState( prevState => ({
      uploads: [ ...prevState.uploads, ...uploads, ]
    }))
  }

  applyFilter = filter => e => {
    e && e.preventDefault()
    this.setState({ filter })
  }
  toggleUploader = e => {
    e && e.preventDefault()
    this.setState( ({ showUploader }) => ({ showUploader: !showUploader }))
  }
  addUpload = upload => {
    this.setState( ({ uploads: prevUploads }) => ({ uploads: [ upload, ...prevUploads ] }))
  }
  removeUpload = upload => {
    this.setState( ({ uploads }) => ({ uploads: [ ...uploads.filter( up => up._id !== upload._id ) ] }))
  }
  updateUpload = upload => {
    const { _id: id } = upload
    const { uploads } = this.state
    const otherUploads = uploads.filter(upload => upload._id !== id)
    this.setState({ uploads: [ upload, ...otherUploads ]}, ()=>console.log('new', this.state.uploads))
  }

  render() {
    const { uploads, showUploader, filter } = this.state
    
    const uploaderProps = {
      addUpload: this.addUpload,
      toggleUploader: this.toggleUploader,
    }
    const uploadListProps = {
      filter,
      uploads,
      applyFilter: this.applyFilter,
      updateUpload: this.updateUpload,
      removeUpload: this.removeUpload,
    }

    let toggleMsg = `Close uploader...`
    if (!showUploader) toggleMsg = `Open uploader...`

    return (
      <div className='UserDashboard'>
        
        <button id="uploader-toggle" onClick={this.toggleUploader}>{toggleMsg}</button>

        { showUploader && <Uploader {...uploaderProps} /> }
        <UploadList { ...uploadListProps } />
      </div>
    )
  }
}
export default UserDashboard
