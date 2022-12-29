const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')

//Configuring DotENV Path
dotenv.config({ path: './configs/.env' })

//Routes Files
const usersRoutes = require('./routers/v1/users')

//Iniatizing Express App
const app = express()

//Using Morgan Logger Middleware
if (process.env.APP_ENV == 'development') {
  app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms'.cyan
        .underline
    )
  )
}

//Using Routes File Here
app.use('/api/v1/users', usersRoutes)

//Express App Port
const PORT = process.env.APP_PORT || 5000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`.green.bold)
})
