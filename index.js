const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/taskRoutes') // Adjust path if necessary
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware to parse JSON bodies
app.use(express.json())
app.use(cors()) // Enable CORS

// Connect to MongoDB
mongoose
  .connect(process.env.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

// Use task routes
app.use('/api', taskRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
