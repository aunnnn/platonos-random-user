
const User = require('../src/User')
const { send } = require('micro')

const getUsers = async (req, res) => {
  const datas = await User.find({})
  send(res, 200, datas)
}

module.exports = getUsers
