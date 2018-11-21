import React from 'react'
import './UploadList.css'

import Upload from './Upload/Upload'

const uploadMap = upload => <Upload key={ upload._id } upload={ upload } />

const filterUploads = uploads => {
  return {
    all_type: uploads,
    complete_type: uploads.filter(e => e.complete),
    clear_type: uploads.filter(e => e.clear),
    active_type: uploads.filter(e => (!e.complete && !e.clear)),
  }
}

const uploadList = ({ uploads, applyFilter, filter }) =>
  // (
{
  const filteredUploads = filterUploads(uploads)

  return <div className='UploadList'>
    
    <div className='buttons'>
      <button onClick={applyFilter('active_type')}>
        New {filteredUploads['active_type'].length}
      </button>
      <button onClick={applyFilter('clear_type')}>
        Posted {filteredUploads['clear_type'].length}
      </button>
      <button onClick={applyFilter('complete_type')}>
        Sold {filteredUploads['complete_type'].length}
      </button>
      <button onClick={applyFilter('all_type')}>
        All {filteredUploads['all_type'].length}
      </button>
    </div>


    { filteredUploads[filter].map(uploadMap) }
  </div>
}
// )

export default uploadList
