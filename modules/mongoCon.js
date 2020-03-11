const mongoose = require('mongoose')
require('dotenv').config()

// DATA BASE CONNECTION
const uri = process.env.DB_URI
const dbconnect = () => mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...')
})

module.exports = dbconnect
