const UserUsageData = require('../src/UserUsageData')
const { send } = require('micro')

const reduceChatQuota = async (req, res) => {
  const forUserId = req.params.forUserId
  const data = await UserUsageData.updateOne({
    gc_id: forUserId
  }, {
    $inc: { numberOfTopicsLeft: -1 }
  })
  send(res, 200, {
    usageData: data,
  })
}

module.exports = reduceChatQuota
