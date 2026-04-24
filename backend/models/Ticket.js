const mongoose = require('mongoose')

// This defines what a ticket looks like in MongoDB
const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open"
  },
  assignedTo: {
    type: String,
    default: "Unassigned"
  }
}, { timestamps: true })  // auto adds createdAt and updatedAt

module.exports = mongoose.model('Ticket', ticketSchema)