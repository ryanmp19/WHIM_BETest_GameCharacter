const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const route = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', route)

console.log(process.env.NODE_ENV)

module.exports = app