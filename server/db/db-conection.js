const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/cohorts-tools-api";

mongoose
  .connect(mongoUrl)
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err))