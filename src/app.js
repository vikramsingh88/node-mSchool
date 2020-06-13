const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport');

const config = require('./config/config')
const loginRoute = require('./routes/login.route')
const studentRoute = require('./routes/student.route')
const classRoute = require('./routes/class.route')
const messageRounte = require('./routes/message.route')
const users = require('./routes/user')


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

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//user middleware
app.use('/users', users)

//user route 
//app.post('/login', loginRoute.authenticate)

//Student route
app.post('/student', passport.authenticate('jwt', {'session' : false}), studentRoute.addStudent)
app.post('/student-fee', passport.authenticate('jwt', {'session' : false}), studentRoute.addStudentFee)
app.get('/student-fee/:studentId/:session', passport.authenticate('jwt', {'session' : false}), studentRoute.getFeesByStudentId)
app.get('/student/:class/:session', passport.authenticate('jwt', {'session' : false}), studentRoute.getStudentsByClass)
app.post('/update-student', passport.authenticate('jwt', {'session' : false}), studentRoute.updateStudentDetailes)
app.post('/student-fee-update', passport.authenticate('jwt', {'session' : false}), studentRoute.updateStudentFee)

app.get('/classes/:session', passport.authenticate('jwt', {'session' : false}), classRoute.getClasses)
app.post('/classes', passport.authenticate('jwt', {'session' : false}), classRoute.addClasses)
app.get('/classes/:className/:session', passport.authenticate('jwt', {'session' : false}), classRoute.getClassTeacherByClass)
app.get('/classes-fees/:className/:session', passport.authenticate('jwt', {'session' : false}), classRoute.getClassMonthlyFeesByClass)
app.get('/classes-exam-fees/:className', passport.authenticate('jwt', {'session' : false}), classRoute.getClassExamFeesByClass)
app.get('/classes-class-exam-fees/:className/:session', passport.authenticate('jwt', {'session' : false}), classRoute.getClassfeesByClass)
app.post('/update-class', passport.authenticate('jwt', {'session' : false}), classRoute.updateClass)

//send messages
app.post('/send-message', messageRounte.sendMessage)
//callback
app.post('/message-sent', (req, res) => {
	console.log('message sent call back')
	res.end();
});

app.listen(config.PORT, () => {
    console.log('Server is running at port '+config.PORT)
})