// import express
const express = require('express')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 5000

// initaial app as express
const app = express()

// add route
app.get('/', (req, res) => {
  res.send('hello')
})
// set app to listen on port
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})
