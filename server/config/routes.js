// const jwt = require('jsonwebtoken')
const uploader = require('../controllers/multer')
  // User = require('../controllers/user'),
  
const User = require('../controllers/user')
const Upload = require('../controllers/upload')

const { isAdmin, isGranted, isLoggedIn } = require('../controllers/helpers')

module.exports = app => {
  
  app.post('/api/register', User.register)
  app.post('/api/login', User.login)
  
  // app.get('/api/users', User.index)
  // app.post('/api/users', isGranted, User.create)

  app.get('/api/users/:id', isLoggedIn, User.show)
  app.put('/api/users/:id', isLoggedIn, User.update)
  app.delete('/api/users/:id', isLoggedIn, User.destroy)
  
  // app.post('/api/login', (req, res) => {
  //   console.log(req.body)
  //   return res.json({ msg: 'check body ', admin: 'yes' })
  // })
  // app.get('/users/:id', isLoggedIn, User.show)
  // app.get('/admin/:id', isLoggedIn, User.index)
  // app.post('/users/:id/photo', isLoggedIn, uploader.array('upl', 2), Upload.photo)
  app.post('/api/users/:id/uploads', isLoggedIn, Upload.create)
  // app.delete('/users/:id/uploads/:up_id', isLoggedIn, Upload.destroy)
  // app.put('/users/:id/uploads/:up_id', isLoggedIn, Upload.update)
  app.post('/api/users/:id/photo', isLoggedIn, uploader.array('upl', 2), Upload.photo)

}


