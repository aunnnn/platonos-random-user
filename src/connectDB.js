const mongoose = require('mongoose')

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/test-micro-db', {
    useMongoClient: true,
    promiseLibrary: global.Promi
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
