import React, { Component } from 'react'
import './PhotoPicker.css'

import previewImg from '../../../../assets/preview.png'
// import waitingImg from '../../../../assets/waiting.png'

import { uploadFetcher } from '../../../../helpers/helpers'

const resizeCanvas = original => {
  let canvas = document.createElement("canvas")
  let width = original.width
  let height = original.height
  const
    MAX_WIDTH = 900,
    MAX_HEIGHT = 900
  
  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width
      width = MAX_WIDTH
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height
      height = MAX_HEIGHT
    }
  }
  canvas.width = width
  canvas.height = height
  canvas.getContext("2d").drawImage(original, 0, 0, canvas.width, canvas.height)
  
  return canvas
}

const initializeState = () => {
  return {
    pickerStyle: {backgroundImage: `url(${previewImg})`}
  }
}

class PhotoPicker extends Component {
  constructor(props) {
    super(props)
    this.state = initializeState()
  }
  sendBlob = async blob => {
    const { getFile } = { ...this.props }
  
    try {
      const photo = await uploadFetcher.storePhoto(blob)
      photo.files.picker = this.props.picker
      getFile(photo.files)
    } catch(err) { console.log(err) }
  }
  fileChange = e => {
    const reader = new FileReader()
    reader.onload = e => {
      let original = new Image()
      original.src = e.target.result
      original.onload = () => {
        let canvas = resizeCanvas(original)
        canvas.toBlob(this.sendBlob, 'image/jpeg', 0.9)
        this.setState(prevState => ({ ...prevState, pickerStyle: {backgroundImage: `url(${canvas.toDataURL()})`}}))
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  render() {

    const { pickerStyle } = this.state
    
    return (
      <div className={`PhotoPicker preview`}
        style={pickerStyle}
        onClick={() => this.inputElement.click()}
      >
        <input
          className="hide_file"
          type="file" accept="image/*"
          onChange={this.fileChange}
          ref={input => this.inputElement = input}
          capture
        />
      </div>
    )
  }
}

export default PhotoPicker
