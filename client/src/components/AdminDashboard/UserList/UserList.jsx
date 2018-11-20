import React from 'react'
import './UserList.css'

import User from './User/User'

const userMap = user => console.log(user) || <User key={ user._id } user={ user } />

const userList = ({ users }) =>
  // (
  {
  return (
    <div className='UserList'>
      { users.map(userMap) }
    </div>
  )
}
// )

export default userList
