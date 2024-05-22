const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

const cors = require('cors')
require('./db/db-conection')

// Imports: 
const Cohort = require('./models/cohorts')
const Student = require('./models/students')



// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// COHORTS:
app.get('/api/cohorts', (req, res)=>{
  
  Cohort
        .find()
        .then(allCohorts => res.json(allCohorts))
        .catch(err => res.json({code: 500, errorDetails: err}))

})

app.get('/api/cohorts/:cohortId', (req, res)=>{
  const {cohortId} = req.params

  Cohort
        .findById(cohortId)
        .then(cohort => res.json(cohort))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.post('/api/cohorts', (req, res) => {
  const {inProgress, cohortSlug, cohortName, program, campus, startData, endDate, programManager, leadTeacher, totalHours} = req.body

  Cohort
        .create({inProgress, cohortSlug, cohortName, program, campus, startData, endDate, programManager, leadTeacher, totalHours})
        .then(newCohort => res.sendStatus(201))
        .catch((err)=> res.json({code: 500, errorDeatails: err}))
})

app.put('/api/cohorts/:cohortId', (req, res)=>{
  const {cohortId} = req.params
  const {inProgress, cohortSlug, cohortName, program, campus, startData, endDate, 
     programManager, leadTeacher, totalHours} = req.body

  Cohort
        .findByIdAndUpdate(cohortId, {inProgress, cohortSlug, cohortName, program, campus, startData, endDate,  programManager, leadTeacher, totalHours})
        .then(updateCohort => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.delete('/api/cohorts/:cohortId', (req, res)=>{
  const {cohortId} = req.params

  Cohort
        .findByIdAndDelete(cohortId)
        .then(() => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


// STUDENTS:
app.get('/api/students', (req, res) => {
  
  Student
        .find()
        .populate('cohort')
        .then(allStudents => res.json(allStudents))
        .catch(err => res.json({code: 500, errorDetails: err}))
})

app.get('/api/students/:studentId', (req, res)=>{
  const {studentId} = req.params

  Student
        .findById(studentId)
        .populate('cohort')
        .then(student => res.json(student))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.post('/api/students', (req, res)=>{
  const {firstName, lastName, email, phone, likedinUrl, languages, program, background, image, projects, cohort} = req.body

  Student
        .create({firstName, lastName, email, phone, likedinUrl, languages, program, background, image, projects, cohort})
        .then(newStudent => res.sendStatus(201))
        .catch((err)=> res.json({code: 500, errorDeatails: err}))
})

app.put('/api/students/:studentId', (req, res)=>{
  const {studentId} = req.params
  const {firstName, lastName, email, phone, likedinUrl, languages, program, background, image, projects, cohort} = req.body

  Student
        .findByIdAndUpdate(studentId, {firstName, lastName, email, phone, likedinUrl, languages, program, background, image, projects, cohort})
        .then(updateCohort => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.delete('/api/students/:studentId', (req, res)=>{
  const {studentId} = req.params

  Student
        .findByIdAndDelete(studentId)
        .then(() => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})





// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
