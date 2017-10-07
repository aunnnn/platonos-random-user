const mongoose = require('mongoose')

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/platonos-random-user', {
    useMongoClient: true,
    promiseLibrary: global.Promise,
  })
  const db = mongoose.connection
  db.on('error', (err) => {
    console.error('connection error: ', err)
  })
  db.once('open', () => {
    console.log('connect successfully.')
  })
}

module.exports = connectDB
