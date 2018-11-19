import axios from 'axios'
import { resolve } from 'path';

export const aux = props => props.children

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const setLocalStorage = user => {
  const { token, id, profile_img } = user
  // const { token, id, profile_img, admin } = user
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

export const fetcher = {
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
    const options = {
      url: `/api/users/${id}`,
      method: 'GET',
    }
    try {
      const { data: user } = await axios(options)
      return user
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
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        data: state
      }
      const { data: upload } = await axios(options)
      return upload
    } catch(err) { throw err }
  },
  
  storePhoto: async blob => {
    let token = localStorage.getItem('token')
    let id = localStorage.getItem('user')
  
    let data = new FormData()
    data.append('upl', blob, 'blobby')
    const options = {
      url: `/api/users/${id}/photo`,
      headers: new Headers({
        'Authorization': `Bearer ${ token }`
      }),
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
  // otherCreate: async () => {

  //   let token = localStorage.getItem('token')
  //   let user = localStorage.getItem('user')

  //   fetch(`/users/${user}/uploads`, {
  //     headers: new Headers({
  //       'Authorization': `Bearer ${token}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }),
  //     method: 'post',
  //     body: JSON.stringify({
  //       ...this.state
  //     })
  //   })
  //   .then(data => data.json())
  //   .then(upload => {
  //     this.setState({
  //       title: '',
  //       msg: '',
  //       price_range: '',
  //       priceHigh: 0,
  //       priceLow: 0,
  //       files: [],
  //       validRange: false
  //     })
  //     this.props.addUpload(upload)
  //     this.props.filterActive(null)
  //     document.getElementById('upload_toggler').innerHTML = "New Upload"
  //   })
  //   .catch(err=>console.log(err))
  // }
}