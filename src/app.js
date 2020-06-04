const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('./config/config')
const loginRoute = require('./routes/login.route')
const studentRoute = require('./routes/student.route')
const classRoute = require('./routes/class.route')

mongoose.connect(config.DB_PATH, { useUnifiedTopology: true })

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//user route 
app.post('/login', loginRoute.authenticate)

//Student route
app.post('/student', studentRoute.addStudent)
app.post('/student-fee', studentRoute.addStudentFee)
app.get('/student-fee/:studentId', studentRoute.getFeesByStudentId)
app.get('/student/:class', studentRoute.getStudentsByClass)
app.post('/update-student', studentRoute.updateStudentDetailes)

app.get('/classes', classRoute.getClasses)
app.post('/classes', classRoute.addClasses)
app.get('/classes/:className', classRoute.getClassTeacherByClass)
app.get('/classes-fees/:className', classRoute.getClassMonthlyFeesByClass)
app.get('/classes-exam-fees/:className', classRoute.getClassExamFeesByClass)
app.get('/classes-class-exam-fees/:className', classRoute.getClassfeesByClass)
app.post('/update-class', classRoute.updateClass)

app.listen(config.PORT, () => {
    console.log('Server is running at port '+config.PORT)
})