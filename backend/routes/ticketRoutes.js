const express = require('express')
const router = express.Router()
const Ticket = require('../models/Ticket')

// GET all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find()
    res.json(tickets)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tickets" })
  }
})

// GET one ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) return res.status(404).json({ message: "Ticket not found" })
    res.json(ticket)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ticket" })
  }
})

// POST create new ticket
router.post('/', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body)
    const savedTicket = await newTicket.save()
    res.status(201).json(savedTicket)
  } catch (err) {
    res.status(400).json({ message: "Failed to create ticket" })
  }
})

// PUT update ticket
router.put('/:id', async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // return the updated version
    )
    res.json(updatedTicket)
  } catch (err) {
    res.status(400).json({ message: "Failed to update ticket" })
  }
})

// DELETE ticket
router.delete('/:id', async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id)
    res.json({ message: "Ticket deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Failed to delete ticket" })
  }
})

module.exports = router