const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('./config/config')
const loginRoute = require('./routes/login.route')
const studentRoute = require('./routes/student.route')
const classRoute = require('./routes/class.route')

mongoose.connect(config.DB_PATH, { useUnifiedTopology: true })
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to mLab');
});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error '+err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//user route 
app.post('/login', loginRoute.authenticate)

//Student route
app.post('/student', studentRoute.addStudent)
app.post('/student-fee', studentRoute.addStudentFee)
app.get('/student-fee/:studentId/:session', studentRoute.getFeesByStudentId)
app.get('/student/:class/:session', studentRoute.getStudentsByClass)
app.post('/update-student', studentRoute.updateStudentDetailes)
app.post('/student-fee-update', studentRoute.updateStudentFee)

app.get('/classes/:session', classRoute.getClasses)
app.post('/classes', classRoute.addClasses)
app.get('/classes/:className/:session', classRoute.getClassTeacherByClass)
app.get('/classes-fees/:className/:session', classRoute.getClassMonthlyFeesByClass)
app.get('/classes-exam-fees/:className', classRoute.getClassExamFeesByClass)
app.get('/classes-class-exam-fees/:className/:session', classRoute.getClassfeesByClass)
app.post('/update-class', classRoute.updateClass)

app.listen(config.PORT, () => {
    console.log('Server is running at port '+config.PORT)
})