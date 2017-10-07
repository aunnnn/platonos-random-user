// const mongoose = require('mongoose')

// const Schema = mongoose.Schema

// const chatroomSchema = Schema({
//   gc_id: String,

//   title: String,
//   createdAt: Date,
//   updatedAt: Date,
//   createdByUserId: { type: Schema.Types.ObjectId, ref: 'User' },
//   userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   stateType: Number,
//   numReported: Number,
//   lastInvitedAt: Date,
//   invitedUserIds: [{ type: Schema.Types.ObjectId, ref: 'User' }]
// })

// const Chatroom = mongoose.model('Chatroom', chatroomSchema)

// const initColl = () => {
//   if(mongoose.models.User) {
//     return mongoose.model('Chatroom')
//   }
//   else {
//     return mongoose.model('Chatroom', chatroomSchema);
//   }
// }

// module.exports = initColl()
