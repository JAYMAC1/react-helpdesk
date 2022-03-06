const express = require('express')
const router = express.Router({ mergeParams: true })
const { getNotes } = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post

// router
//   .route('/:id')
//   .get(protect, getTicket)
//   .delete(protect, deleteTicket)
//   .put(protect, updateTicket)
module.exports = router
