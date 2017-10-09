
const User = require('../src/User')
const { send, json } = require('micro')

const dateLastNDays = (n) => {
  return new Date(Date.now() - n*864e5)
}
const getRandomUser = async (req, res) => {
  const forUserId = req.params.forUserId
  
  let excluded = [];
  if (req.query.config) {
    //query not empty
    const configJSON = JSON.parse(req.query.config)
    const excludedArray = configJSON.excluded
    if (excludedArray instanceof Array) {
      excluded = excludedArray
    }
  }

  const last2Days = dateLastNDays(2)

  const usersByLastInvitedAt = await User.findOne({
    lastActiveAt: {
      $gte: last2Days,
    },
    gc_id: {
      $nin: [forUserId, ...excluded],
    }
  }).sort({ lastInvitedAt: 1 })
  send(res, 200, {
    user: usersByLastInvitedAt,
    excluded,
  })
}

module.exports = getRandomUser
