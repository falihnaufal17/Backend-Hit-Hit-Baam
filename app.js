require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')

const port = process.env.PORT || 1700

const userRoutes = require('./src/routes/user')
const scoreRoutes = require('./src/routes/score')
const patternRoutes = require('./src/routes/pattern')

app.listen(port, () => {
    console.log(`Server started with port: ${port}`)
})

app.use(cors())
app.use(xssFilter())
app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//router

app.use('/users', userRoutes)
app.use('/scores', scoreRoutes)
app.use('/patterns', patternRoutes)