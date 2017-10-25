const UserUsageData = require('../src/UserUsageData')
const { send } = require('micro')

const getUserUsageData = async (req, res) => {
  const datas = await UserUsageData.find({})
  send(res, 200, datas)
}

module.exports = getUserUsageData
