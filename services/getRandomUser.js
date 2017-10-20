
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
  const usersByLastInvitedAt = await User.aggregate([
    {
      // First exclude some users
      $match: {
        gc_id: {
          $nin: [forUserId, ...excluded],
        }
      }
    },
    {
      // Join the usage data to User
      $lookup: {
        from: "userusagedatas",
        localField: "gc_id",
        foreignField: "gc_id",
        as: "usageData",
      }
    },
    {
      // Get only some fields
      $project: {
        usageData: { $arrayElemAt: [ "$usageData", 0 ] },
        gc_id: 1,
        createdAt: 1,
        username: 1,
      }
    },  
    {
      // Filter users by 3-day last active
      $match: {
        'usageData.lastActiveAt': {
          $gte: last3Days,
        }
      }
    },
    {
      // Sort lastInvitedAt ascending (so those longest last invited will be first one)
      $sort: {
        'usageData.lastInvitedAt': 1,
      }
    },
    {
      $limit: 1,
    }
  ])
  let targetUser = null
  if (usersByLastInvitedAt.length === 1) targetUser = usersByLastInvitedAt[0]

  // const usersByLastInvitedAt = await User.findOne({
  //   lastActiveAt: {
  //     $gte: last3Days,
  //   },
  //   gc_id: {
  //     $nin: [forUserId, ...excluded],
  //   }
  // }).sort({ lastInvitedAt: 1 })
  send(res, 200, {
    user: targetUser,
    excluded,
  })
}

module.exports = getRandomUser
