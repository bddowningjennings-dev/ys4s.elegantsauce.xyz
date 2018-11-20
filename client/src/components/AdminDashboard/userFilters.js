
const userFilters = {
  removeAdmin: users => {
    const adminID = localStorage.getItem('user')
    return users.filter(user => user._id !== adminID)
  }
  
}

export default userFilters