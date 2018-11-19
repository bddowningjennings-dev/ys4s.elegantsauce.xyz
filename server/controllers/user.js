const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../models/users')

const createLocalStorageData = user => ({
  id: user._id,
  profile_img: user.profile_img,
  email: user.email,
  userName: user.userName,
})

class User {
  async index(req, res) {
    try {
      const user = await Users.find({})
      return res.json(user)
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
    const { params } = req
    try {
      const user = await Users.findById(params.id).populate('uploads').exec()
      // const { password, stripPassword } = user
      return res.json({ ...createLocalStorageData(user), uploads: user.uploads })
    } catch(err) { 
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




  // create(req, res) {
  //   let photos = [], photos_long = [], attachments = []
  //   let html = `<p>${ req.params.id }</p><p>${req.body.title}</p><p>${req.body.msg}</p>`
  //   for (let file of req.body.files) {
  //     photos_long.push(__dirname + '/../../' + file.path)
  //     photos.push('uploads/' + file.filename)
  //     attachments.push({
  //         filename: file.filename,
  //         path: __dirname + '/../../' + file.path,
  //         cid: file.filename
  //     })
  //     html += `<p><img style="width:500px" src="cid:${file.filename}"/></p>`
  //   }
  //   req.body.photos = photos
  //   req.body.photos_long = photos_long
  //   req.body.user = req.params.id
  //   User.create(req.body, (err, upload) => {
  //     if (err) return res.json(err)
  //     User.findOne({_id: req.params.id}, (err, user) => {
  //       user.uploads.push(upload._id)
  //       user.save()
  //       html = `<p>${user.email}</p>` + html
  //       let body = { html, attachments }
  //       // mailer('YS4SEMAIL', body)
  //     })
  //     return res.json(upload)
  //   })
  // }
  // show(req, res) {
  //   User.findOne({ _id: req.params.up_id }, (err, upload) => {
  //     if (err) return res.json(err)
  //     return res.json(upload)
  //   })
  // }
  // destroy(req, res) {
  //   if (!isGranted(req.params.id, req.params.up_id))
  //     return res.json({ error: 'not granted'})
  //   User.findByIdAndRemove(req.params.up_id, (err, upload) => err ? res.json(err) : res.json(upload))
  // }
  // update(req, res) {
  //   if (!isGranted(req.params.id, req.params.up_id))
  //     return res.json({ error: 'not granted'})
  //   User.findByIdAndUpdate(req.params.up_id, { $set: req.body }, { new: true }, (err, upload) => {
  //     return err ? res.json(err) : res.json(upload)})
  // }

module.exports = new User()
