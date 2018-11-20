import React from 'react'
import './Upload.css'

import defaultImg from '../../../../assets/logo.svg'

const photoMap = photo => (
  <img
    key={photo}
    alt={defaultImg}
    src={`/server/uploads/${photo}`} //dev path
    // src={`${photo}`}
  />
)

const upload = ({ upload: { title, msg, photos } }) => (
  <div className='Upload'>
    <section className="info">
      <p>{ title }</p>
      <p>{msg}</p>
    </section>
    <section className="imgs">
      { photos.map(photoMap) }
    </section>
  </div>
)

export default upload
