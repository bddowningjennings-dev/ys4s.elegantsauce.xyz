
const jwt = require('jsonwebtoken')

const isGranted = async (req, res, next) => {
  console.log('made it here')
  const { id, up_id } = req.params
  if (isAdmin(id)) return next()
  try {
    const upload = await Upload.findById(up_id)
    if (id === upload.user) return next()
  } catch (err) { return false }
  return res.json({error: 'Not Granted'})
}

const isAdmin = async id => {
  try {
    const user = await User.findById(id)
    if (!user) return false
    return (process.env.ADMIN_EMAILS.split(' ').includes(`${user.email}`))    
  } catch (err) {
    return false
  }
}

const isAuthorized = async req => {
  if (!req.headers.authorization) return false
  const client_token = req.headers.authorization.split(' ')[1]
  
  try {
    const decoded = await jwt.verify(client_token, process.env.JWT_SECRET)
    return (decoded.id === req.params.id)
  } catch(err) { return false }
}

const isLoggedIn = async (req, res, next) => {
  if (await isAuthorized(req)) return next()
  console.log('auth error')
  return res.json({error: 'Auth error'})
}

module.exports = {
  isGranted,
  isAuthorized,
  isLoggedIn,
}