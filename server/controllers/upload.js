
const User = require('../models/users')
const Upload = require('../models/uploads')
  // mailer = require('../controllers/mailer'),

class UploadController {
  async index(req, res) {
    try {
      const uploads = await Upload.find({})
      return res.json(uploads)
    } catch(err) { return res.json(err) }
  }
  async create(req, res) {
    // console.log(req.params.id)
    // const testBody = {
    //   user: req.params.id,
    //   photos: ['test'],
    //   photos_long: ['test_long'],
    //   msg: 'test msg',
    //   title: 'test title',
    // }
    let photos = [], photos_long = [], attachments = []
    let html = `<p>${ req.params.id }</p><p>${req.body.title}</p><p>${req.body.msg}</p>`
    for (let file of req.body.files) {
      photos_long.push(__dirname + '/../../' + file.path)
      photos.push('server/uploads/' + file.filename)
      attachments.push({
          filename: file.filename,
          path: __dirname + '/../../' + file.path,
          cid: file.filename
      })
      html += `<p><img style="width:500px" src="cid:${file.filename}"/></p>`
    }
    req.body.photos = photos
    req.body.photos_long = photos_long
    console.log('user', req.params.id)
    req.body.user = req.params.id

    console.log(html)

    try {
      console.log('testing', req.body)
      const upload = await Upload.create(req.body)
      console.log(upload)
      const user = await User.findById(req.params.id)
      if (!user) return res.json({ err: 'user not found' })
      console.log(user)
      user.uploads.push(upload._id)
      console.log('made it here')
      user.save()
      return res.json(upload)
    } catch(err) { return res.json(err) }
  }
  async show(req, res) {
    try {
      const upload = await Upload.findById(req.params.up_id)
      return res.json(upload)
    } catch(err) { return res.json(err) }
  }
  photo(req, res) {
    return res.json({ files: {
      filename: req.files[0].filename,
      path: req.files[0].path
    }})
  }
  // async create(req, res) {
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
  //   Upload.create(req.body, (err, upload) => {
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
  // destroy(req, res) {
  //   if (!isGranted(req.params.id, req.params.up_id))
  //     return res.json({ error: 'not granted'})
  //   Upload.findByIdAndRemove(req.params.up_id, (err, upload) => err ? res.json(err) : res.json(upload))
  // }
  // update(req, res) {
  //   if (!isGranted(req.params.id, req.params.up_id))
  //     return res.json({ error: 'not granted'})
  //   Upload.findByIdAndUpdate(req.params.up_id, { $set: req.body }, { new: true }, (err, upload) => {
  //     return err ? res.json(err) : res.json(upload)})
  // }
}

// const isGranted = (id, up_id) => {
//   if (isAdmin(id)) return true
//   return Upload.findById(up_id, (err, upload) =>{
//     return (id === upload.user)
//   })
// }
// const isAdmin = (id) => {
//   return User.findById(id, (err, user) => {
//     if (err || !user) return false
//     return (process.env.ADMIN_EMAILS.split(' ').includes(`${user.email}`))
//   })
// }
module.exports = new UploadController()