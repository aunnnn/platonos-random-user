const { send } = require('micro')
const fetch = require('node-fetch')

const cryptoCharts = async (req, res) => {   
  const id = req.params.id
  const response = await fetch('https://graphs.coinmarketcap.com/currencies/' + id)
  const json = await response.json()
  send(res, 200, json)
}

module.exports = cryptoCharts
