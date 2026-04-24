const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const ticketRoutes = require('./routes/ticketRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())                  // allow React to call this API
app.use(express.json())          // allow JSON data in requests

// Routes
app.use('/api/tickets', ticketRoutes)

// Home route
app.get('/', (req, res) => {
  res.send('🎫 Ticket Management API is running!')
})

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!')
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log('❌ MongoDB connection failed:', err)
  })