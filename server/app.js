const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const cohortsData = require(`./cohorts.json`);
const studentsData = require(`./students.json`);

const cors = require('cors')
con

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const mongoose = require("mongoose");



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));



// Model schema
const cohortSchema = new mongoose.Schema({
  _id: String,
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: Date,
  endDate: Date,
  programManager: String,
  leadTeacher: String,
  totalHours: Number
})

const studentSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  linkedin_url: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  projects: [String],
  cohort: String

})

// Model
const CohortModel = mongoose.model('cohort', cohortSchema)
const StudentModel = mongoose.model('student', studentSchema)



app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get('/api/cohorts', (req, res) => {

  CohortModel
    .find()
    .then(allMovies => res.json(cohortsData))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})

app.get('/api/students', (req, res) => {

  StudentModel
    .find()
    .then(allMovies => res.json(studentsData))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});