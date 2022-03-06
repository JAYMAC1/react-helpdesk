const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      requird: true,
      ref: 'User',
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      requird: true,
      ref: 'Ticket',
    },
    text: {
      type: String,
      required: [true, 'Please add text.'],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', ticketSchema)
