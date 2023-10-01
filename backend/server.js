const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') // For parsing JSON request bodies
const cors = require('cors') // Enable Cross-Origin Resource Sharing

// Create an instance of Express.js
const app = express()

// Middleware
app.use(cors()) // Enable CORS for all routes (you can adjust this as needed)
app.use(bodyParser.json()) // Parse JSON request bodies

mongoose.connect(
  'mongodb+srv://admin:admin@automatrix.i2gdsjb.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('Connected to the MongoDB database')
})

connection.on('error', (error) => {
  console.error('MongoDB Connection Error:', error)
})

//connecting the routes
app.use('/returns', require('./Routes/returns.js'))
app.use('/complaints', require('./Routes/complaints.js'))

//default route for checking
app.get('/', (req, res) => {
  res.send('Welcome to the MERN API')
})

// Start the Express.js server
const PORT = process.env.PORT || 5000
//checking the server running port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
