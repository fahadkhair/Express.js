const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import cors

const app = express();
const port = 4000;

// Use CORS middleware
app.use(cors()); // Allow all origins by default

// Alternatively, restrict to specific origin:
// app.use(cors({ origin: 'http://localhost:3001' }));

app.use(bodyParser.json()); // To parse JSON bodies

// Serve static files
app.use(express.static(path.join(__dirname, "publicindex")));

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// About route
app.get('/about', (req, res) => {
  res.send('It\'s about something');
});

// Handle POST requests to save data
app.post('/save', (req, res) => {
  const data = req.body;

  // Save the data to a file (you can modify this to save it in a database or other storage)
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error saving data');
    }
    res.send('Data saved successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
