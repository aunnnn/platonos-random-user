const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userUsageDataSchema = Schema({
  _id: Schema.Types.ObjectId,
  gc_id: String,

  lastActiveAt: Date,
  lastInvitedAt: Date,  
  numberOfTopicsLeft: {
    type: Number,
    default: 5,
  },
})

const initColl = () => {
  if(mongoose.models.UserUsageData) {
    return mongoose.model('UserUsageData')
  } else {
    return mongoose.model('UserUsageData', userUsageDataSchema)
  }
}

module.exports = initColl()
