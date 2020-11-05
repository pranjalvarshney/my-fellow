require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(express())

mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, response) => {
  if (err) {
    console.log(err)
  }
  console.log("MongoDB connected successfully")

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
  })

})