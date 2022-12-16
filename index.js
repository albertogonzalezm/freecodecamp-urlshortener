require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlRoutes = require("./routes/url.routes")

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.use("/api", bodyParser.urlencoded({ extended: false }));
app.use("/api", urlRoutes);

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => { console.error(e) })

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
