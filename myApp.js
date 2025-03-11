require('dotenv').config();
const bodyParser = require("body-parser");

const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 3000;

console.log("Hello World");

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to log request details
app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve static files from the /public directory
app.use("/public", express.static(__dirname + "/public"));

// JSON response route
app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

// Route to get current time
app.get('/now', 
  (req, res, next) => {
    req.time = new Date().toString();  
  next();
}, 
  (req, res) => {
    res.json({ 
      time: req.time 
    });
});

// Echo route
app.get('/:word/echo', (req, res) => {
  // Access the corresponding key in the req.params
  // use destructuring to get multiple parameters
  const { word } = req.params;
   // Send the req.params object as a JSON Response
  res.json({
    echo: word
  });
});

// GET route to handle query parameters
app.get('/name', (req, res) => {
  //destructure and rename the keys
  const { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({ 
    name: `${firstName} ${lastName}`
  });
});

// POST route to handle URL-encoded data
app.post('/name', (req, res) => {
  const { first: firstName, last: lastName } = req.body;
  res.json({ name: `${firstName} ${lastName}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





























 module.exports = app;

