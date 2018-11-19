const multer = require('multer')
const fs = require('fs')
// const UPLOAD_PATH = './public/static/uploads'
const UPLOAD_PATH = './server/uploads'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // fs.mkdirSync(UPLOAD_PATH)
    cb(null, `${UPLOAD_PATH}`)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
  }
})

module.exports = multer({ storage: storage })