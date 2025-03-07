const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

console.log("Hello World");

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use("/public", express.static(__dirname + "/public"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
