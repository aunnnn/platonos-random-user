
const User = require('../src/User')
const { send } = require('micro')

const getUsers = async (req, res) => {
  const datas = await User.aggregate([
    {
      $lookup: {
        from: "userusagedatas",
        localField: "gc_id",
        foreignField: "gc_id",
        as: "usageData",
      }
    },
    {
      $project: {
        usageData: { $arrayElemAt: [ "$usageData", 0 ] },
        username: 1,
        gc_id: 1,
        createdAt: 1,
      }
    },  
  ])
  send(res, 200, datas)
}

module.exports = getUsers
