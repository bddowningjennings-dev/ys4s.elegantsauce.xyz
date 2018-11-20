const uploader = require('../controllers/multer')
  
const User = require('../controllers/user')
const Upload = require('../controllers/upload')

const { isGranted, isLoggedIn } = require('../controllers/helpers')

module.exports = app => {
  
  app.post('/api/register', User.register)
  app.post('/api/login', User.login)
  
  app.get('/api/users/:id', isLoggedIn, User.show)
  app.put('/api/users/:id', isLoggedIn, User.update)
  app.delete('/api/users/:id', isLoggedIn, User.destroy)
  
  app.get('/api/admin/:id', isLoggedIn, isGranted, User.index)

  app.post('/api/users/:id/uploads', isLoggedIn, Upload.create)
  app.post('/api/users/:id/photo', isLoggedIn, uploader.array('upl', 2), Upload.photo)
  
  // app.put('/users/:id/uploads/:up_id', isLoggedIn, Upload.update)
  // app.delete('/users/:id/uploads/:up_id', isLoggedIn, Upload.destroy)
}


