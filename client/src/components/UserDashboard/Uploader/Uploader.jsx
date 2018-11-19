import React, { Component } from 'react'
import './Uploader.css'

import PhotoPicker from './PhotoPicker/PhotoPicker'

import { uploadFetcher } from '../../../helpers/helpers'

const pickerMap = getFile => (_, i) => (<PhotoPicker key={i} picker={i} getFile={getFile} />)

const issuePickers = count => {
  if (count <= 5) {
    return new Array(count + 1).fill(true)
  }
  return new Array(count).fill(true)
}

const initializeState = () => ({
  msg: '',
  title: '',
  files: [],
})

class Uploader extends Component {
  state = initializeState()

  handleChange = e => {
    e && e.preventDefault()
    this.setState({ [ e.target.name ]: e.target.value })
  }

  getFile = file => {
    const { files } = this.state
    let others = files.filter( each => each.picker !== file.picker )
    this.setState( prevState => ({ ...prevState, files: [ file, ...others ] }))
  }

  handleSubmit = async e => {
    e && e.preventDefault()
    const { addUpload, toggleUploader } = this.props
    let { title, msg, files } = this.state
    if ( !title || !msg || files.length === 0 ) return alert('form not complete')
    const upload = await uploadFetcher.create(this.state)
    addUpload(upload)
    toggleUploader()
  }

  render() {
    const { title, msg, files } = this.state

    const pickers = issuePickers(files.length)
    const preview = (
      <section id='preview'>
        { pickers.map(pickerMap(this.getFile)) }
      </section>
    )

    return (
      <div className="Uploader" id="uploader_form">
        { preview }
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Title (Required)"
          onChange={this.handleChange}
        />
        <textarea
          name="msg"
          value={msg}
          cols="140" rows="12"
          placeholder="Add Description (Required)"
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}> Upload </button>
      </div>
    )
  }
}

export default Uploader
