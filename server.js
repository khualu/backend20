// SETUP & NODE MODULES
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

// OWN FILES
const dbconnect = require('./db/mongoCon')
const userRouter = require('./routes/routes')
const apiCall = require('./api/apiCall')

// DATA BASE CONNECTION
dbconnect()

// CALL API
apiCall()

// SERVER SETUP
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(session({
    secret: process.env.SESS_SECRET,
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.MAX_AGE_COOKIE),
      sameSite: true,
      secure: process.env.IN_PROD
    }
  }))
  .set('view engine', 'ejs')
  .use(express.static('src'))

  .use(userRouter)

  .listen(port)

console.log(`Server is listening to ${port}`)
