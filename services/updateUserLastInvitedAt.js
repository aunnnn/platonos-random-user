
const UserUsageData = require('../src/UserUsageData')
const { send } = require('micro')

const updateUserLastInvitedAt = async (req, res) => {
  const gcId = req.params.gcId
  await UserUsageData.updateOne({ gc_id: gcId }, {
    lastInvitedAt: new Date(),    
  }, {
    upsert: true,
  })
  send(res, 200, {
    success: true,
  })
}

module.exports = updateUserLastInvitedAt
