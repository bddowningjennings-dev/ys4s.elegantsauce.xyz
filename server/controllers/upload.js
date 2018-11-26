
const User = require('../models/users')
const Upload = require('../models/uploads')
const  mailer = require('../controllers/mailer')

class UploadController {
  async index(req, res) {
    try {
      const uploads = await Upload.find({})
      return res.json(uploads)
    } catch(err) { return res.json(err) }
  }
  async create(req, res) {
    let photos = [], photos_long = [], attachments = []

    let html = ''
    for (let file of req.body.files) {
      const path = `${__dirname}/../../${file.path}`
      photos_long.push(path)
      photos.push(file.filename)
      attachments.push({
        path,
        filename: file.filename,
        cid: file.filename,
      })
      html += `<p><img style="width:500px" src="cid:${file.filename}"/></p>`
    }
    req.body.photos = photos
    req.body.photos_long = photos_long
    req.body.user = req.params.id
    try {
      // console.log('testing', req.body)
      const user = await User.findById(req.params.id)
      if (!user) return res.json({ err: 'user not found' })
      console.log(user)
      let mailTo = [process.env.MAILER_EMAIL, user.email]
      if (req.body.emailReceipt === 'false') mailTo.pop()
      
      const upload = await Upload.create(req.body)
      console.log(upload)

      user.uploads.push(upload._id)
      
      // console.log('made it here')
      user.save()

      html = `
        <p>Upload User: ${user.email} - ${req.params.id}</p>
        <p>Upload Title: ${req.body.title}</p>
        <p>Upload Messege: ${req.body.msg}</p>
        ${html}
      `
  
      console.log('html >> ', html)

      mailer(mailTo, { html, attachments })
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
  async destroy(req, res) {
    // if (!isGranted(req.params.id, req.params.up_id))
    //   return res.json({ error: 'not granted' })
    try {
      const user = await User.findOne({ uploads: { $in: [req.params.up_id] } })
      user.uploads = user.uploads.filter( up => `${up}` !== req.params.up_id )
      await user.save()
      const upload = await Upload.findByIdAndRemove(req.params.up_id)
      return res.json(upload)
    } catch(err) { return res.json(err) }
  }
  update(req, res) {
    // if (!isGranted(req.params.id, req.params.up_id))
    //   return res.json({ error: 'not granted'})
    Upload.findByIdAndUpdate(req.params.up_id, { $set: req.body }, { new: true }, (err, upload) => {
      return err ? res.json(err) : res.json(upload)})
  }
}

module.exports = new UploadController()
