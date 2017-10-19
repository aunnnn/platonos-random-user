const { send } = require('micro')
const { GraphQLClient, request } = require('graphql-request')
const User = require('../src/User')

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
  await User.remove({ 
    gc_id: {
      $nin: userGcIds,
    } 
  })

  const afterRemoveLength = await User.count({})

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
  send(res, 200, {
    success: true,
    numberOfDeletedInvalidUsers: beforeRemoveLength - afterRemoveLength,    
    currentUserCount: afterRemoveLength,
    users: users,
  })
}

module.exports = refreshGraphcoolUsers
