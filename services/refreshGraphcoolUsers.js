const { send } = require('micro')
const { GraphQLClient, request } = require('graphql-request')
const User = require('../src/User')
const UserUsageData = require('../src/UserUsageData')

const endpoint = ' https://api.graph.cool/simple/v1/cj8ypa9sx038s018686140dpr'

const ALL_USERS_QUERY = `
  query AllUsers {
    allUsers {
      id
      username
      email

      createdAt
      updatedAt
    }
  }
`

const refreshGraphcoolUsers = async (req, res) => {
  const users = (await request(endpoint, ALL_USERS_QUERY)).allUsers
  const userGcIds = users.map(u => u.id)

  const beforeRemoveLength = await User.count({})
  
  // Remove user that's not in the real data.
  const userRemovedResult = await User.remove({ 
    gc_id: {
      $nin: userGcIds,
    } 
  })

  const usageRemovedResult = await UserUsageData.remove({
    gc_id: {
      $nin: userGcIds,
    }
  })

  for (let u of users) {
    await User.updateOne({ gc_id: u.id }, {
      $set: {
        gc_id: u.id,
        username: u.username,
        email: u.email,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      }
    }, {
      upsert: true,
    })
  }  

  const currentUserCount = await User.count({})
  send(res, 200, {
    success: true,
    currentUserCount,
    users: users,
    userRemovedResult,
    usageRemovedResult,
  })
}

module.exports = refreshGraphcoolUsers
