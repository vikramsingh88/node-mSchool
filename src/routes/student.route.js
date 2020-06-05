const Student = require('../model/student.model')
const Fee = require('../model/fees.model')

//create student
module.exports.addStudent = (req, res) => {
    console.log('Sudent : '+req.body)
    const newStudent = new Student(req.body)
    newStudent.save().then((student) => {
        res.json({
            message : 'Student addess successfully',
            isSuccess : true,
            student
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in creating student',
            isSuccess : false
        })
    })
}

//update student
module.exports.updateStudentDetailes = (req, res) => {
    console.log('updating student by id '+req.body._id)
    Student.findOneAndUpdate({_id:req.body._id}, req.body)
    .then((updatedStudent) => {
        res.json({
            message : 'student updated successdully',
            isSuccess : true,
            student : updatedStudent
        });
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in updating student',
            isSuccess : false,
        })
    })
}

//update student fees
module.exports.addStudentFee = (req, res) => {
    console.log("adding student fees")
    const newFee = new Fee(req.body)
    newFee.save().then((fee) => {
        res.json({
            message : 'Student fee added successdully',
            isSuccess : true,
            fee
        });
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in adding student fee',
            isSuccess : false,
        })
    })
}

//get all student by class
module.exports.getStudentsByClass = (req, res) => {
    const className = req.params.class
    const session = req.params.session
    Student.find({studentClass : className})
    .then((students) => {
        res.json({
            message : "list of students fetches successfully",
            isSuccess : true,
            students
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting list of students',
            isSuccess : false,
        })
    })
}

//get student fee
module.exports.getFeesByStudentId = (req, res) => {
    const studentId = req.params.studentId
    const session = req.params.session
    Fee.find({studentId, session})
    .then((fees) => {
        res.json({
            message : "list of students fetches successfully",
            isSuccess : true,
            fees
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting student fee',
            isSuccess : false
        })
    })
}

