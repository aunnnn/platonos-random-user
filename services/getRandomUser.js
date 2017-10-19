
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

  const last3Days = dateLastNDays(3)

  // Logic = get all users that are active in last 3 days, then get the one that is invited longest time ago.
  const usersByLastInvitedAt = await User.findOne({
    lastActiveAt: {
      $gte: last3Days,
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
