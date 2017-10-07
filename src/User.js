const mongoose = require('mongoose')

const Schema = mongoose.Schema

const nDaysAgo = (n) => new Date(new Date() - (1000*60*60*24*n));

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  gc_id: String,

  username: String,
  email: String,

  createdAt: Date,
  updatedAt: Date,

  // chatrooms: [{ type: Schema.Types.ObjectId, ref: 'Chatroom' }],
  // createdChatrooms: [{ type: Schema.Types.ObjectId, ref: 'Chatroom' }],
  // invitedChatrooms: [{ type: Schema.Types.ObjectId, ref: 'Chatroom' }],

  // THESE ARE THE ONLY DIFFERENCES WITH GRAPH.COOL
  lastActiveAt: Date,
  lastInvitedAt: Date,
})

const initColl = () => {
  if(mongoose.models.User) {
    return mongoose.model('User')
  } else {
    return mongoose.model('User', userSchema)
  }
}

module.exports = initColl()
