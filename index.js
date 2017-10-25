const { send } = require('micro')
const { router, get } = require('microrouter')
const cors = require('micro-cors')()

const User = require('./src/User')
const connectDB = require('./src/connectDB')

const debugUsers = require('./services/debugUsers')
const debugUserUsageData = require('./services/debugUserUsageData')

const getRandomUser = require('./services/getRandomUser')
const getUsageData = require('./services/getUsageData')
const refreshGraphcoolUsers = require('./services/refreshGraphcoolUsers')
const updateUserLastActiveAt = require('./services/updateUserLastActiveAt')
const updateUserLastInvitedAt = require('./services/updateUserLastInvitedAt')

connectDB()

const handleErrors = fn => async (req, res) => {
  try {
    return await fn(req, res)
  } catch (err) {
    console.log(err.stack)
    send(res, 500, 'Internal error: ' + err)
  }
}

const serviceStatus = (req, res) => {
  send(res, 200, {
    status: 'Up and running :D',
  })
}

const handler = router(
  get('/', serviceStatus),
  get('/debugUsers', debugUsers),
  get('/debugUserUsageData', debugUserUsageData),
  handleErrors(get('/getUsageData/:forUserId', getUsageData)),
  handleErrors(get('/getRandomUser/:forUserId', getRandomUser)),
  handleErrors(get('/refreshGraphcoolUsers', refreshGraphcoolUsers)),
  handleErrors(get('/updateUserLastActiveAt/:gcId', updateUserLastActiveAt)),
  handleErrors(get('/updateUserLastInvitedAt/:gcId', updateUserLastInvitedAt)))

module.exports = cors(handler)
