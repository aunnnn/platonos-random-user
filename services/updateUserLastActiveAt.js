
const User = require('../src/User')
const { send } = require('micro')

const updateUserLastActiveAt = async (req, res) => {
  const gcId = req.params.gcId
  await User.update({ gc_id: gcId }, {
    lastActiveAt: new Date(),    
  })
  send(res, 200, {
    success: true,
  })
}

module.exports = updateUserLastActiveAt
