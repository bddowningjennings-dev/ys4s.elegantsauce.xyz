import axios from 'axios'

export const setLocalStorage = user => {
  const { token, id, profile_img } = user
  localStorage.setItem('token', token)
  localStorage.setItem('user', id)
  localStorage.setItem('profile_img', profile_img)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('admin')
  localStorage.removeItem('profile_img')
}

export const userFetcher = {
  login: async state => {
    const options = {
      url: '/api/login',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: { ...state }
    }
    try {
      const { data: user } = await axios(options)
      if (user.token && !user.err) setLocalStorage(user)
      return user
    } catch(err) { throw err }
  },
  register: async state => {
    const options = {
      url: '/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: state
    }
    try {
      const { data: user } = await axios(options)
      if (user.token && !user.err) setLocalStorage(user)
      return user
    } catch(err) { throw err }
  },
  logout: clearLocalStorage,
  getUser: async id => {
    if (!id) return
    const token = localStorage.getItem('token')

    const options = {
      url: `/api/users/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    try {
      const { data: user } = await axios(options)

      return user
    } catch(err) { throw err }
  },
  adminGetUsers: async id => {
    if (!id) return
    const token = localStorage.getItem('token')

    const options = {
      url: `/api/admin/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    try {
      const { data: users } = await axios(options)

      return users
    } catch(err) { throw err }
  }
}

export const uploadFetcher = {
  create: async state => {

    let id = localStorage.getItem('user')
    let token = localStorage.getItem('token')

    try {
      const options = {
        url: `/api/users/${id}/uploads`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        data: state
      }
      const { data: upload } = await axios(options)
      return upload
    } catch(err) { throw err }
  },
  update: async ({ up_id, ...data }) => {
    console.log('up_id', data)
    let id = localStorage.getItem('user')
    let token = localStorage.getItem('token')

    const options = {
      url: `/api/users/${id}/uploads/${up_id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      data
    }
    try {
      const { data: upload } = await axios(options)
      return upload
    } catch(err) { console.log(err) }
  },
  destroy: async up_id => {
    let id = localStorage.getItem('user')
    let token = localStorage.getItem('token')

    const options = {
      url: `/api/users/${id}/uploads/${up_id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    }
    try {
      const { data: upload } = await axios(options)
      return upload
    } catch(err) { console.log(err) }
  },
  storePhoto: async blob => {
    let token = localStorage.getItem('token')
    let id = localStorage.getItem('user')
  
    let data = new FormData()
    data.append('upl', blob, 'blobby')
    const options = {
      url: `/api/users/${id}/photo`,
      headers: {
        'Authorization': `Bearer ${ token }`
      },
      method: 'POST',
      data
    }
    try {
      const { data: photo } = await axios(options)
      return photo
    } catch(err) { console.log(err) }
  },
  resizeCanvas: original => {
    let canvas = document.createElement("canvas")
    let width = original.width
    let height = original.height
    const
      MAX_WIDTH = 900,
      MAX_HEIGHT = 900
    
    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width
        width = MAX_WIDTH
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height
        height = MAX_HEIGHT
      }
    }
    canvas.width = width
    canvas.height = height
    canvas.getContext("2d").drawImage(original, 0, 0, canvas.width, canvas.height)
    
    return canvas
  },
}
