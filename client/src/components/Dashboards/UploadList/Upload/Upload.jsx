import React, { Component } from 'react'
import './Upload.css'

import defaultImg from '../../../../assets/logo.svg'
import { aux as Aux, dateFormat, uploadFetcher } from '../../../../helpers/helpers'

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

      this.setState({ complete, clear },
        () => updateUpload(upload)
      )
    } catch (err) { console.log(err) }
  }
  // handleRemove = (event) => {
  //   if (this.props.removeUpload) {
  //     let up_id = this.state._id
  //     let token = localStorage.getItem('token')
  //     let user = localStorage.getItem('user')
  //     fetch(`/users/${user}/uploads/${up_id}`, {
  //       headers: new Headers({
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }),
  //       method: 'delete',
  //     })
  //     .then(data => data.json())
  //     .then(upload => {
  //       this.props.removeUpload(upload._id)
  //     })
  //     .catch(err=>console.log(err))
  //   }
  // }

  render() {
    const { upload: { title, msg, photos, updatedAt, createdAt } } = this.props
    const { hidden } = this.state

    const initDate = dateFormat(createdAt)
    const upDate = dateFormat(updatedAt)
    
    const buttons = (
      <div className="upload_buttons">
        <button
          onClick={this.handleUpdate('clear')}>
          Mark <br /> For Sale
        </button>
        <button
          onClick={this.handleUpdate('complete')}>
          Mark <br /> Sold
        </button>
        {/* <button
          id={`delete-${_id}`}
          onClick={this.handleRemove}>
          Delete <br />
        </button> */}
      </div>
    )

    return (
      <div className='Upload'>
        <div className='upload-header'>
          <div className='upload-title'>
    <button onClick={ this.handleShow } >{ title }</button>
          
          </div>

          <div className="upload-buttons"> {buttons} </div>
        </div>

        <div className="upload-details">
            
            <div className="upload_date">{upDate}</div>
            <div className="upload_date">{initDate}</div>
            {`${photos.length} photo(s)`}
        </div>
        
        {(!hidden) &&
          <Aux>
          
        <section className="info">
          <p>{ title }</p>
          <p>{msg}</p>
        </section>
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
