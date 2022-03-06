const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc    Get nors for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('Nser not found')
  }
  console.log(req.user.id)
  console.log(req.params.tickedId)
  const ticket = await Ticket.findById(req.params.tickedId)
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const notes = await Note.find({ ticket: req.params.tickedId })

  res.status(200).json(notes)
})

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.tickedId)
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.tickedId,
    user: req.user.id,
  })

  res.status(200).json(note)
})

module.exports = { getNotes, addNote }
