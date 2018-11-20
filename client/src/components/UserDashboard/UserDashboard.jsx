import React, { Component } from 'react'
import './UserDashboard.css'

import Uploader from './Uploader/Uploader'
import UploadList from './UploadList/UploadList'

const initializeState = ({ user, uploads = [] }) => {
  return ({
  user,
  uploads,
  showUploader: true,
})}

class UserDashboard extends Component {
  state = initializeState(this.props)

  componentDidUpdate = (lastProps, lastState) => {
    const { uploads } = this.props
    if (uploads !== lastProps.uploads) this.setState( prevState => ({
      uploads: [ ...prevState.uploads, ...uploads, ]
    }))
  }
  toggleUploader = e => {
    e && e.preventDefault()
    this.setState( prevState => ({
      ...prevState,
      showUploader: !prevState.showUploader
    }))
  }
  addUpload = upload => {
    this.setState( prevState => ({
      ...prevState,
      uploads: [upload, ...prevState.uploads],
    }))
  }

  render() {
    const { uploads, showUploader } = this.state
    const uploaderProps = {
      addUpload: this.addUpload,
      toggleUploader: this.toggleUploader,
    }
    let toggleMsg = `Close uploader...`
    if (!showUploader) toggleMsg = `Open uploader...`
    return (
      <div className='UserDashboard'>
        {/* UserDashboard: {user} */}
        <button id="uploader-toggle" onClick={this.toggleUploader}>{toggleMsg}</button>
        { showUploader && <Uploader {...uploaderProps} />}
        <UploadList uploads={ uploads } />
      </div>
    )
  }
}
export default UserDashboard
