import React, { Component } from 'react'
import './Upload.css'

import defaultImg from '../../../../assets/logo.svg'
import { aux as Aux, dateFormat } from '../../../../helpers/helpers'

const photoMap = photo => (
  <img
    key={photo}
    alt={defaultImg}
    src={`/server/uploads/${photo}`} //dev path
    // src={`${photo}`}
  />
)

const initializeState = () => {
  return {
    hidden: true,
  }
}

class Upload extends Component {
  state = initializeState()

  handleShow = e => {
    e && e.preventDefault()
    this.setState(({ hidden }) => ({ hidden: !hidden }))
  }

  render() {
    const { upload: { title, msg, photos, createdAt } } = this.props
    const { hidden } = this.state
    let date = dateFormat(createdAt)
    return (
      <div className='Upload'>
        <div className="upload_date">{date}</div>
        {`${photos.length} photo(s)`}
                <button onClick={ this.handleShow } >{ title }</button>
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
