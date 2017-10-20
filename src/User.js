const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  gc_id: String,

  username: String,
  email: String,

  createdAt: Date,
  updatedAt: Date,
})

const initColl = () => {
  if(mongoose.models.User) {
    return mongoose.model('User')
  } else {
    return mongoose.model('User', userSchema)
  }
}

module.exports = initColl()
