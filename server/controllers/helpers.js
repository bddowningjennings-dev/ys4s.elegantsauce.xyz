
const jwt = require('jsonwebtoken')

const isGranted = async (id, up_id) => {
  if (isAdmin(id)) return true
  try {
    const upload = await Upload.findById(up_id)
    return (id === upload.user)
  } catch(err) { return false }
  // return Upload.findById(up_id, (err, upload) =>{
  //   return (id === upload.user)
  // })
}
const isAdmin = async id => {
  try {
    const user = await User.findById(id)
    if (!user) return false
    return (process.env.ADMIN_EMAILS.split(' ').includes(`${user.email}`))    
  } catch (err) {
    return false
  }
  // return User.findById(id, (err, user) => {
  //   if (err || !user) return false
  //   return (process.env.ADMIN_EMAILS.split(' ').includes(`${user.email}`))
  // })
}

const isAuthorized = async req => {
  if (!req.headers.authorization) return false
  const client_token = req.headers.authorization.split(' ')[1]
  try {
    const decoded = await jwt.verify(client_token, process.env.JWT_SECRET)
    console.log('auth check', decoded.userId === req.params.id)
    return (decoded.userId === req.params.id)
  } catch(err) { return false }
}

const isLoggedIn = (req, res, next) => {
  if (isAuthorized(req)) return next()
  return res.json({error: 'Auth error'})
}

module.exports = {
  isAdmin,
  isGranted,
  isAuthorized,
  isLoggedIn,
}