const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/userController')

router.post('/', (req, res) => registerUser)
router.post('/login', (req, res) => loginUser)

module.exports = router
