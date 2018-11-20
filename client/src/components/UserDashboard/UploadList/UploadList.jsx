import React from 'react'
import './UploadList.css'

import Upload from './Upload/Upload'

const uploadMap = upload => <Upload key={ upload._id } upload={ upload } />

const uploadList = ({ uploads }) =>
  // (
  {
  return <div className='UploadList'>
    { uploads.map(uploadMap) }
  </div>
}
// )

export default uploadList
