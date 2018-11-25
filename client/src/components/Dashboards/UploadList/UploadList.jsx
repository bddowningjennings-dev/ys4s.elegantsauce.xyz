import React from 'react'
import './UploadList.css'

import Upload from './Upload/Upload'

const filterUploads = uploads => {
  return {
    all_type: uploads,
    complete_type: uploads.filter(e => e.complete),
    clear_type: uploads.filter(e => e.clear),
    active_type: uploads.filter(e => (!e.complete && !e.clear)),
  }
}

const uploadList = ({ uploads, applyFilter, filter, updateUpload }) => {
  const filteredUploads = filterUploads(uploads)
  const uploadMap = upload => <Upload updateUpload={ updateUpload } key={ upload._id } upload={ upload } />

  return <div className='UploadList'>
    
    <div className='buttons'>
    <button className="sorter new" onClick={applyFilter('active_type')}>
              <div className="sort_count"> { filteredUploads['active_type'].length } </div>
              <div className="sort_title"> New </div>
      </button>
      
      {/* <button onClick={applyFilter('active_type')}>
        New {filteredUploads['active_type'].length}
        
      </button> */}
      {/* <button onClick={applyFilter('clear_type')}>
        Posted {filteredUploads['clear_type'].length}
      </button> */}

    <button className="sorter clear" onClick={applyFilter('clear_type')}>
              <div className="sort_count"> { filteredUploads['clear_type'].length } </div>
              <div className="sort_title"> Posted </div>
      </button>

      {/* <button onClick={applyFilter('complete_type')}>
        Sold {filteredUploads['complete_type'].length}
      </button> */}

    <button className="sorter complete" onClick={applyFilter('complete_type')}>
              <div className="sort_count"> { filteredUploads['complete_type'].length } </div>
              <div className="sort_title"> Sold </div>
</button>

      
      {/* <button onClick={applyFilter('all_type')}>
        All {filteredUploads['all_type'].length}
      </button> */}

    <button className="sorter all" onClick={applyFilter('all_type')}>
              <div className="sort_count"> { filteredUploads['all_type'].length } </div>
              <div className="sort_title"> All </div>
</button>
    </div>

    { filteredUploads[filter].map(uploadMap) }
  </div>
}
// )

export default uploadList
