import React from 'react'
import './UploadList.css'

import Upload from './Upload/Upload'

const filterUploads = uploads => {
  return {
    all_type: uploads,
    complete_type: uploads.filter(e => e.complete),
    clear_type: uploads.filter(e => e.clear),
    new_type: uploads.filter(e => (!e.complete && !e.clear)),
  }
}

const uploadList = ({ uploads, applyFilter, filter, updateUpload, removeUpload }) => {
  const filteredUploads = filterUploads(uploads)
  const getUploadProps = upload => ({ upload, updateUpload, removeUpload, key: upload._id })
  const uploadMap = upload => <Upload {...getUploadProps(upload)} />

  let newActive = filter.includes('new') ? 'active' : ''
  let clearActive = filter.includes('clear') ? 'active' : ''
  let completeActive = filter.includes('complete') ? 'active' : ''
  let allActive = filter.includes('all') ? 'active' : ''

  return <div className='UploadList'>
    <div className='buttons'>
      <button className={`sorter new ${newActive}`} onClick={applyFilter('new_type')}>
        <div className="sort_count"> { filteredUploads['new_type'].length } </div>
        <div className="sort_title"> New </div>
      </button>
      <button className={`sorter clear ${clearActive}`} onClick={applyFilter('clear_type')}>
        <div className="sort_count"> { filteredUploads['clear_type'].length } </div>
        <div className="sort_title"> Posted </div>
      </button>
      <button className={`sorter complete ${completeActive}`} onClick={applyFilter('complete_type')}>
        <div className="sort_count"> { filteredUploads['complete_type'].length } </div>
        <div className="sort_title"> Sold </div>
      </button>
      <button className={`sorter all ${allActive}`} onClick={applyFilter('all_type')}>
        <div className="sort_count"> { filteredUploads['all_type'].length } </div>
        <div className="sort_title"> All </div>
      </button>
    </div>

    {filteredUploads[filter].map(uploadMap)}
    {
      (filteredUploads[filter].map(uploadMap).length < 1) &&
      <div className="empty-filter">
        ... empty list ...
      </div>
    }
  </div>
}
// )

export default uploadList
