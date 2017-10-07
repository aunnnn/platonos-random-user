
const User = require('../src/User')
const { send } = require('micro')

const dateLastNDays = (n) => {
  return new Date(Date.now() - n*864e5)
}
const getRandomUser = async (req, res) => {
  const forUserId = req.params.forUserId

  const last2Days = dateLastNDays(2)

  const usersByLastInvitedAt = await User.findOne({
    lastActiveAt: {
      $gte: last2Days,
    },
    gc_id: {
      $ne: forUserId,
    }
  }).sort({ lastInvitedAt: 1 })
  send(res, 200, {
    user: usersByLastInvitedAt,
  })
}

module.exports = getRandomUser
