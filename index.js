const express = require('express')
const createError = require('http-errors')
require('dotenv').config()
require('./Helper/mongo')

const UserRoute = require('./Routes/User.route')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', UserRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})