import React from 'react'
import './UserList.css'

import User from './User/User'

const userMap = user => <User key={ user._id } user={ user } />

const userList = ({ users }) =>(
  <div className='UserList'>
    { users.map(userMap) }
  </div>
)

export default userList
