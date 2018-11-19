const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    default: '/server/uploads/profile-imgs/logo.svg'
  },
  uploads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload'
  }]
}, { timestamps: true })

// UserSchema.pre('save', next => {
//   let user = this
//   console.log(user)
//   if (user.password === 'ha') {
//     console.log('it is ha')
//     return next()
//   }
//   console.log('not ha')
//   return next()
// })

module.exports = mongoose.model('User', UserSchema)
