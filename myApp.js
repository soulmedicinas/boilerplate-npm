require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

console.log("Hello World");

app.get("/", (req, res) => {
  res.json({"message": "HELLO JSON"});
  process.env.MESSAGE_STYLE;
  process.env.MESSAGE_STYLE=uppercase;
});

app.use("/public", express.static(__dirname + "/public"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
