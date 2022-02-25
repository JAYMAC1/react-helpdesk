// import express
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 5000
const { connectDB } = require('./config/db')

connectDB()

// initaial app as express
const app = express()

// middlewares
const { errorHandler } = require('./middleware/errorMiddleware')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// add route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

// set app to listen on port
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})
