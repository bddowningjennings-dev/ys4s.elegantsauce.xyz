const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../models/users')

const createLocalStorageData = user => ({
  id: user._id,
  email: user.email,
  userName: user.userName,
  profile_img: user.profile_img,
})

class User {
  async index(req, res) {
    try {
      const users = await Users.find({}).populate('uploads').exec()
      return res.json(users)
    } catch(err) { return res.json(err) }
  }
  async create(req, res) {
    try {
      const user = await Users.create(req.body)
      return res.json(user)
    } catch(err) {
      const { errmsg } = err
      if ( errmsg.includes('duplicate') ) return res.json({ err: 'duplicate email' })
      return res.json(err)
    }
  }
  async destroy(req, res) {
    try {
      const user = await Users.findByIdAndRemove(req.params.id)
      return res.json(user)
    } catch(err) { 
      return res.json(err)
    }
  }
  async show(req, res) {
    const { id } = req.params
    try {
      const user = await Users.findById(id).populate('uploads').exec()
      console.log('before')

      if ( process.env.ADMIN_EMAILS.split(' ').includes(`${ user.email }`) ) {
        const data = { ...createLocalStorageData(user), admin: true }
        return res.json(data)
      }
console.log('after')
      return res.json({ ...createLocalStorageData(user), uploads: user.uploads })
    } catch (err) { 
      console.log('err', err)
      return res.json(err)
    }
  }
  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      return res.json(user)
    } catch(err) { return res.json(err) }
  }
  async register(req, res) {
    const { email, password } = req.body
    let user, token
    console.log('reg called')
    try {
      user = await Users.findOne({ email })
      if ( user ) return res.json({ err: `${ email } previously registered.` })

      req.body.password = bcrypt.hashSync(password, 14)
      user = await Users.create(req.body)
      console.log('user', user)

      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      console.log('token', token)

      return res.json({ ...createLocalStorageData(user), token })
    } catch (err) {
      
      if ( errmsg.includes('duplicate' )) return res.json({ err: 'duplicate email err' })
      return res.json(err)
    }
  }
  async login(req, res) {
    const { email, password } = req.body
    let token, data, user
    try {
      user = await Users.findOne({ email }).populate('uploads').exec()

      if ( !user ) return res.json({ err: `${ email } not registered` })
      
      if ( !bcrypt.compareSync(password, user.password) ) {
        return res.json({ err: 'password does not match' })
      }

      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

      if ( process.env.ADMIN_EMAILS.split(' ').includes(`${ user.email }`) ) {
        data = { ...createLocalStorageData(user), admin: true, token }
        return res.json(data)
      }

      data = { ...createLocalStorageData(user), token, uploads: user.uploads }
      return res.json(data)

    } catch(err) { return res.json(err) }
  }
}

module.exports = new User()
