import React, { Component } from 'react'
import './Upload.css'

import { uploadFetcher } from '../../../../helpers/fetcher'
import { aux as Aux, dateFormat, } from '../../../../helpers/helpers'

import defaultImg from '../../../../assets/logo.svg'

const photoMap = photo => (
  <img
    key={photo}
    alt={defaultImg}
    src={`/server/uploads/${photo}`} //dev path
    // src={`${photo}`}
  />
)

const initializeState = ({ upload: { complete, clear } }) => {
  return {
    clear,
    complete,
    hidden: true,
  }
}

class Upload extends Component {
  state = initializeState(this.props)

  handleShow = e => {
    e && e.preventDefault()
    this.setState(({ hidden }) => ({ hidden: !hidden }))
  }
  handleUpdate = type => async e => {
    e && e.preventDefault()

    const { updateUpload, upload: { _id: up_id } } = this.props
    const { complete, clear } = this.state

    let updates
    if (type === 'complete') {
      updates = {
        up_id: up_id,
        complete: !complete,
      }
    } else if (type === 'clear') {
      updates = {
        up_id: up_id,
        clear: !clear,
      }
    }
    try {
      const upload = await uploadFetcher.update(updates)
      const { complete, clear } = upload

      this.setState({ complete, clear }, () => updateUpload(upload))
    } catch (err) { console.log(err) }
  }
  handleRemove = async e => {
    e && e.preventDefault()
    const { upload: { _id: up_id }, removeUpload } = this.props

    try {
      const upload = await uploadFetcher.destroy(up_id)
      removeUpload(upload)
    } catch(err) { console.log(err) }
  }

  render() {
    const { upload: { title, msg, photos, updatedAt, createdAt } } = this.props
    const { hidden } = this.state

    const initDate = dateFormat(createdAt)
    const upDate = dateFormat(updatedAt)
    
    const buttons = (
      <div className="upload_buttons">
        <button
          onClick={this.handleUpdate('clear')}>
          { this.state.clear === false ? `Mark Posted` : `Clear Posted` }
        </button>
        <button
          onClick={this.handleUpdate('complete')}>
          { this.state.complete === false ? `Mark Sold` : `Clear Sold` }
        </button>
        <button
          onClick={this.handleRemove}>
          Request Delete
        </button>
      </div>
    )

    return (
      <div className='Upload'>
        <div className='upload-header'>
          <div className='upload-title'>
            <button onClick={ this.handleShow } >{ title }</button>
          </div>
          <span className="upload-photo-count">{`${photos.length} photo(s)`}</span>
          <div className="upload-buttons"> {buttons} </div>
        </div>
        
        {
          (!hidden) &&
          <Aux>
            <section className="info">
              <p>Title: { title }</p>
              <p>Messege: {msg}</p>
            </section>
              
            <div className="upload-details">
              <div className="upload_date">Updated: {upDate}</div>
              <div className="upload_date">Created: {initDate}</div>
            </div>
            <section className="imgs">
              { photos.map(photoMap) }
            </section>
          </Aux>
        }
      </div>
    )
  }
}
export default Upload
