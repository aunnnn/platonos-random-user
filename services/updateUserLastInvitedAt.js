
const User = require('../src/User')
const { send } = require('micro')

const updateUserLastInvitedAt = async (req, res) => {
  const gcId = req.params.gcId
  await User.update({ gc_id: gcId }, {
    lastInvitedAt: new Date(),    
  })
  send(res, 200, {
    success: true,
  })
}

module.exports = updateUserLastInvitedAt
