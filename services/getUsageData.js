const UserUsageData = require('../src/UserUsageData')
const { send } = require('micro')

const getUsageData = async (req, res) => {
  const forUserId = req.params.forUserId
  const data = await UserUsageData.findOne({
    gc_id: forUserId
  })
  send(res, 200, {
    usageData: data,
  })
}

module.exports = getUsageData
