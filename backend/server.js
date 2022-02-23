// import express
const express = require('express')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 5000

// initaial app as express
const app = express()

// add route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

app.use('/api/users', require('./routes/userRoures'))
// set app to listen on port
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})
