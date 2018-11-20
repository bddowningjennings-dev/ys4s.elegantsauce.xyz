import React from 'react'
import './User.css'

const uploadMap = upload => console.log(upload) || (
  <div
    key={upload._id}>
    title: {upload.title} - msg: {upload.msg} <br />
    complete: {upload.complete ? 'yes' : 'no'} - clear: {upload.clear ? 'yes':'no'} <br />    
    {upload.photos.map(photo => <img key={photo} src={`server/uploads/${photo}`} />)}
    {/* {upload.photos.map(photo => <img key={photo} src={photo} />)} */}
  </div>
  // <img
  //   key={photo}
  //   alt={defaultImg}
  //   src={`/server/uploads/${photo}`} //dev path
  //   // src={`${photo}`}
  // />
)

const user = ({ user: { userName, email, profile_img, uploads } }) => (
  <div className='User'>
    <img alt="profile_img" src={profile_img} />
    {userName} - { email }
    <section className="user-uploads">
      { uploads.map(uploadMap) }
    </section>
  </div>
)

export default user
