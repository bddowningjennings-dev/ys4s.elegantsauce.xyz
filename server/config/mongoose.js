const mongoose = require('mongoose')

module.exports = async DATABASE => {
  try {
    await mongoose.connect(`mongodb://localhost/${DATABASE}`, { useNewUrlParser: true, useCreateIndex: true })
    console.log(`(database): connected to ${DATABASE}...`)
  } catch(err) { console.log(err) }
}