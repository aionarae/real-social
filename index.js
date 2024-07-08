// Purpose: Entry point for the server
const express = require('express');
// Import the connection to the database
const db = require('./config/connection.js');
// Import the routes
const routes = require('./routes');

// Initialize the server
const app = express();
// Set the port
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Serve up static assets
app.use(routes);

// Start the server after the database connection is open
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});