import React, { Component } from 'react'
import './Uploader.css'

import PhotoPicker from './PhotoPicker/PhotoPicker'
import SelectInput from '../../../customInputs/SelectInput'

import { uploadFetcher } from '../../../../helpers/fetcher'

const pickerMap = getFile => (_, i) => (<PhotoPicker key={i} picker={i} getFile={getFile} />)

const issuePickers = count => {
  if (count <= 5) {
    return new Array(count + 1).fill(true)
  }
  return new Array(count).fill(true)
}
const emailReceiptOptions = [
  {value: 'false', name: 'No thank you'},
  {value: 'true', name: 'Sure, why not?'},
]

const initializeState = () => ({
  msg: '',
  title: '',
  files: [],
  emailReceipt: 'false',
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
    this.setState({ files: [ file, ...others ] })
  }
  handleSubmit = async e => {
    e && e.preventDefault()
    const { addUpload, toggleUploader } = this.props
    let { title, msg, files } = this.state
    if (!title || !msg || files.length === 0) return alert('form not complete')
    try {
      const upload = await uploadFetcher.create(this.state)
      addUpload(upload)
      toggleUploader()
    } catch(err) { console.log(err) }
  }
  pullSubState = (key, sectionState) => {
    this.setState({ [key]: sectionState })
  }

  render() {
    const { title, msg, files, emailReceipt } = this.state

    const pickers = issuePickers(files.length)
    const preview = (
      <section id='preview'>
        { pickers.map(pickerMap(this.getFile)) }
      </section>
    )

    return (
      <div className="Uploader" id="uploader_form">
        {preview}
        <SelectInput
          name={ 'emailReceipt' }
          label={ 'Opt in for email receipt?' }
          options={ emailReceiptOptions }
          value={emailReceipt}
          passState={this.pullSubState}
        />
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
